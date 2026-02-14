"use server";

import { PurchaseStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getNZDateKey } from "../helpers";



export async function getPurchases(filter?: PurchaseStatus) {
    const userId = await getUserId();


    

    const purchases = await prisma.purchase.findMany({
        where: { userId},
       
        orderBy:
            { createdAt: "desc" },
        select: {
            id: true,
            createdAt: true,
            purchaseNumber: true,
            quantity: true,
            totalCost: true,
            status: true,
            stockItem: {
                select: {
                    name: true,
                    quantity: true,
                    id: true,
                    vendor: {
                        select: {
                            name: true,
                            PONumber:true
                        }
                    }
                }
            }

        }
    });



    const serialisedPurchases = purchases.map(item => ({
        ...item,
        totalCost: item.totalCost.toString(),
    }));


    const placedPurchases = serialisedPurchases.filter(
        item => item.status === "PLACED"
    );

    const receivedPurchases = serialisedPurchases.filter(
        item => item.status === "RECEIVED"
    );


    if (filter === "PLACED") {
        return placedPurchases;
    } else if (filter === "RECEIVED") {
        return receivedPurchases;
  
    } else {
        return serialisedPurchases;
    }

}

export async function getPurchaseById(id: string) {
    const userId = await getUserId();

    const purchase = await prisma.purchase.findUnique({
        where: { userId, id },
        select: {
            id: true,
            createdAt: true,
            purchaseNumber: true,
            notes: true,
            quantity: true,
            totalCost: true,
            status: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true
                }
            }

        }
    });




return {...purchase, totalCost: purchase?.totalCost.toString()}
}


export async function getPurchaseStatusCount() {
    const userId = await getUserId();

    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const requests = await prisma.purchase.findMany({
        select: {
            status: true,
            createdAt: true
        },
        where: { userId }
    });




    const queryCounts = {
        PLACED: requests.filter(q => q.status === "PLACED").length,
        RECEIVED: requests.filter(q => q.status === "RECEIVED").length,
        DELAYED: requests.filter(q => q.createdAt < threeDaysAgo && q.status !=='RECEIVED').length 

    }

    return queryCounts

}

export async function getPuchaseCardData() {
    const userId = await getUserId();
    const request = await prisma.purchase.findMany({
        where: { userId },
        select: {
            status: true,
            quantity: true,
            stockItem: {
                select: {
                    name: true,
                    vendor: {
                        select: {
                            name: true
                        }
                    }

                }
            }
        }
    });

    return request;
}


export async function getDelayedPurchases() {

    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const userId = await getUserId();
    const purchases = await prisma.purchase.findMany({
        where: {
            userId, createdAt: {
                lte: threeDaysAgo,
            }, status: { not: "RECEIVED" }
        },
        select: {
            id: true,
            quantity: true,
            stockItem: {
                select: {
                    name: true,

                }
            },
            vendor: {
                select: {
                    name: true
                }
            },
            createdAt: true
        },

    });

    return purchases;
};



export async function getPurchaseHealthPercentage(){
    const userId = await getUserId();

    const purchases = await prisma.purchase.findMany({
        where:{userId},
        select:{
            status:true
        }
    });

      if (purchases.length === 0) {
    return {
      health: 100,
      breakdown: {
        received: 0,
        placed: 0,
    
      },
    };
  }



    const received = purchases.filter(
        p => p.status =="RECEIVED"
    ).length;

    const placed = purchases.filter(
        p => p.status == "PLACED"
    ).length;

     const WEIGHTS = {
    RECEIVED: 1,
    PLACED: 0.75,
  
  } as const;
   const totalScore = purchases.reduce((sum, p) => {
    return sum + WEIGHTS[p.status];
  }, 0);
    const health = Math.round((totalScore / purchases.length) * 100);


 return {
  health,
  breakdown: {
    received,
    placed,
   
  },
};
};

export async function getIncomingPurchases(){
    const userId = await getUserId();

    const purchases = await prisma.purchase.findMany({
        where:{userId,status: "PLACED"},
        select:{
            id: true,
            createdAt:true,
            quantity:true,
            status:true,
            purchaseNumber:true,
            vendor:{
                select:{
                    name:true,
                    email:true
                }
            },
            stockItem:{
                select:{
                    id:true,
                    name:true
                }
            }
        },
        take: 5
    });

    return purchases
};

export async function getIncomingPurchaseStockIds(){
    const userId = await getUserId();
    const purchaseIds = await prisma.purchase.findMany({
        where:{userId, status: "PLACED"},
        select: {
            stockId:true
        }
    });
    
    return purchaseIds;
}

export async function getIncomingPurchasesCount(){
    const userId = await getUserId();

    const purchases = await prisma.purchase.count({
        where:{userId, status: "PLACED"}
    });

    return purchases;
}

export async function getPurchaseChartData(){
    const userId = await getUserId();
    const start = new Date();
    start.setDate(start.getDate() - 90);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const purchases = await prisma.costLedger.findMany({
        where:{userId, sourceType: "PURCHASE",
            createdAt:{
                gte: start,
                lte: end
               
            }
        }
    });

    const map = new Map<string, {date: string, spend: number}>();

    for (const purchase of purchases){
        const dateKey = getNZDateKey(purchase.createdAt);
        const existing = map.get(dateKey) ?? {
            date: dateKey,
            spend: 0
        };

        existing.spend += Number(purchase.totalCost)


        map.set(dateKey, existing);

    };

    const result: {date: string, spend: number}[] = [];
      const current = new Date(start);

    while(getNZDateKey(current) <= getNZDateKey(end)){
      const key = getNZDateKey(current);

      result.push(
        map.get(key) ?? {
            date: key,
            spend: 0
        }
      );
      current.setDate(current.getDate() + 1)
    };

    return result
}
