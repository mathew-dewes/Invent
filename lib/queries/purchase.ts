"use server";

import { PurchaseStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";


export async function getPurchases(filter?: PurchaseStatus){
    const userId = await getUserId();

    const purchases = await prisma.purchase.findMany({
        where:{userId},
        orderBy:
        {createdAt: "desc"},
        select:{
            id: true,
            createdAt: true,
            purchaseNumber: true,
            
            quantity: true,
            PO: true,
            totalCost: true,
            status: true,
            stockItem: {
                select:{
                    name: true,
                    quantity: true
                }
            }

        }
    });


    const placedPurchases = purchases.filter(
        item => item.status ===  "PLACED"
    );
    const delayedPurchases = purchases.filter(
        item => item.status ===  "DELAYED"
    );
    const receivedPurchases = purchases.filter(
        item => item.status ===  "RECEIVED"
    );


    if (filter === "PLACED"){
        return placedPurchases;
    } else if (filter === "DELAYED"){
        return delayedPurchases;
    } else if (filter === "RECEIVED"){
        return receivedPurchases;
    } else {

    return purchases;
    }

}

export async function getPurchaseById(id: string){
      const userId = await getUserId();

    const purchase = await prisma.purchase.findUnique({
        where:{userId, id},
        select:{
            id: true,
            createdAt: true,
            purchaseNumber: true,
            notes: true,
            quantity: true,
            PO: true,
            totalCost: true,
            status: true,
            stockItem: {
                select:{
                    id: true,
                    name: true,
                    quantity: true
                }
            }

        }
    });

    return purchase
}


export async function getPurchaseStatusCount(){
        const userId = await getUserId();

        const requests = await prisma.purchase.findMany({
            select:{
                status:true
            },
            where:{userId}
        });


        const queryCounts = {
            PLACED:requests.filter(q => q.status === "PLACED").length,
            DELAYED: requests.filter(q => q.status === "DELAYED").length,
            RECEIVED: requests.filter(q => q.status === "RECEIVED").length,
        
        }

          return queryCounts

}

export async function getPuchaseCardData(){
        const userId = await getUserId();
    const request = await prisma.purchase.findMany({
        where:{userId},
        select:{
            status:true,
            quantity:true,
            stockItem:{
                select:{
                    name:true,
                    vendor:{
                        select:{
                            name:true
                        }
                    }
                  
                }
            }
        }
    });

    return request;
}

export async function getPurchaseChartData(){
          const userId = await getUserId();

          const data = await prisma.purchase.groupBy({
            by: ["status"],
            where:{userId},
            _count:{
                _all:true
            }
          });

          const statusMap = {
DELAYED: "Delayed",
  PLACED: "Placed",
  RECEIVED: "Received",


} as const;

const base = Object.keys(statusMap).map(status => ({
  name: statusMap[status as keyof typeof statusMap],
  purchases: 0,
  status: status as PurchaseStatus,
}));

const formatted = base.map(item => {
  const found = data.find(d => d.status === item.status);

  return {
    ...item,
    purchases: found ? found._count._all : 0,
  };
});

return formatted
}