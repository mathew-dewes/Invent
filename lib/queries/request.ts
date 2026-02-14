"use server";

import { RequestStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getNZDateKey } from "../helpers";

export async function getRequests(filter?: RequestStatus) {
    const userId = await getUserId();
    const requests = await prisma.request.findMany({
        where: {
            userId,
        },


        orderBy: {
            createdAt: "desc"
        },

        select: {
            id: true,
            requestNumber: true,
            createdAt: true,
            completedAt:true,
            customer: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true,
                    reorderPoint: true,
                    
                }
            },
            quantity: true,
            status: true,
            costCentre: {
                select:{
                    name: true
                }
            },
            note: true
        }

    });



    const openRequests = requests.filter(
        item => item.status === "PENDING"
    );

    const readyRequests = requests.filter(
        item => item.status === "READY"
    );
    const completeRequests = requests.filter(
        item => item.status === "COMPLETE"
    );

    if (filter === "PENDING") {
        return openRequests;
    } else if (filter === "COMPLETE") {
        return completeRequests;
    } else if (filter === "READY") {
        return readyRequests;
    } else {
        return requests;
    }



}



export async function getRequestChartData() {
    const userId = await getUserId();
    const start = new Date();
    start.setDate(start.getDate() - 90);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const requests = await prisma.request.findMany({
        where: {
            userId,
            completedAt: {
                gte: start, lte: end
            }
        },
        select: {
            completedAt: true,
            status: true
        }
    });

    const map = new Map<string, { date: string; requests: number }>();

    for (const request of requests) {
        const dateKey = getNZDateKey(request.completedAt!);
        const existing = map.get(dateKey) ?? {
            date: dateKey,
      
            requests: 0
        };

        if (request.status == "COMPLETE") {
            existing.requests += 1;
        } 

        map.set(dateKey, existing)
    };

    const result: { date: string; requests: number }[] = [];
    const current = new Date(start);

    while (getNZDateKey(current) <= getNZDateKey(end)) {
        const key = getNZDateKey(current);

        result.push(
            map.get(key) ?? {
                date: key,
    
                requests: 0
            }
        );
        current.setDate(current.getDate() + 1);
    };
    return result

}




export async function getRequestsByStatusCount() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        select: {
            status: true
        },
        where: { userId }
    });


    const queryCounts = {
        PENDING: requests.filter(q => q.status === "PENDING").length,
        READY: requests.filter(q => q.status === "READY").length,
        COMPLETE: requests.filter(q => q.status === "COMPLETE").length
    }

    return queryCounts
}



export async function getCompletedRequests() {
    const userId = await getUserId();
    const stock = await prisma.request.findMany({
        where: {
            userId,
            status: "COMPLETE"
        },


        orderBy: {
            createdAt: "desc"
        },

        select: {
            id: true,
            requestNumber: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true
                }
            },
            quantity: true,
            status: true,
            costCentre: true,
            note: true
        }

    });


    return stock;
}


export async function getLatestOpenRequests() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        where: { userId, status: "PENDING" },
        select: {
            quantity: true,
            customer: true,
            id: true,
            createdAt: true,
            stockItem: {
                select: {
                    name: true,
            

                }
            }
        },
        orderBy:{
            createdAt: "desc"
        },
        take: 5
    });

    return requests;
};

export async function getOpenRequestCount(){
    const userId = await getUserId();
    
    const count = await prisma.request.count({
        where:{
            userId,
            status:"PENDING"
        }
    });

    return count;
}

export async function getLatestReadyRequests() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        where: { userId, status: "READY" },
        select: {
            id: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    name: true
                }
            },
            quantity: true

        },
        orderBy:{
            createdAt: "desc"
        },
        take: 5
    });

    return requests;
};


export async function getReadyRequestCount(){
    const userId = await getUserId();

    const count = await prisma.request.count({
        where:{userId, status: "READY"}
    });

    return count;
}




export async function getMonthlyHighestSpendingChartData(){
    const userId = await getUserId();

    const customers = await prisma.request.findMany({
        where:{userId, status:"COMPLETE"},
        select:{
            customer:true,
            stockItem:{
                select:{
                    unitCost:true,
                }
            },
            quantity:true
        }
    });

  const spendMap = new Map<string, number>();


    for (const request of customers){
    const unitCost = Number(request.stockItem?.unitCost ?? 0);
    const spend = unitCost * request.quantity;
    
    spendMap.set(request.customer, (spendMap.get(request.customer) ?? 0) + spend
    );


    };
    
  return Array.from(spendMap.entries()).map(
    ([customer, spend]) => ({
      customer,
      spend
    })
  ).sort((a, b) => b.spend - a.spend);





};

export async function getHighestSpendingCustomersCostCentreAndSpend(){
    const userId = await getUserId();

    const requests = await prisma.request.findMany(
        {where: {userId, status:"COMPLETE"},
    select:{
        customer:true,
        costCentre:true,
        stockItem:{
            select:{
                unitCost:true
            }
        },
        quantity: true
    }}
    
    );

    const spendMap = new Map<string, { costCentre: string; spend: number }
>();

for (const request of requests){
  const unitCost = Number(request.stockItem?.unitCost ?? 0);
  const spend = unitCost * request.quantity;

  const current = spendMap.get(request.customer) ?? {
    spend: 0,
  };

  spendMap.set(request.customer, {
    spend: current.spend + spend,
    costCentre: request.costCentre.name
  })
}

    return Array.from(spendMap.entries()).map(
  ([customer, data]) => ({
    customer,
    costCentre: data.costCentre,
    spend: data.spend,

  })
).sort((a, b) => b.spend - a.spend).slice(0, 10);
};

export async function getMostRequestedChartData(){

    const userId = await getUserId();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    start.setHours(0, 0, 0, 0);

    const requests = await prisma.request.findMany(
        {where:{userId, createdAt:{gte: start}},
    select:{
        stockItem:{
            select:{
                name:true,

            }
        },
        quantity:true
    }}
    );

        const requestsMap = new Map<string, { stock: string; requests: number }>();

        for (const request of requests){
            const current = requestsMap.get(request.stockItem.name) ?? {
                requests: 0
            };

            requestsMap.set(request.stockItem.name, {
                requests: current.requests + request.quantity,
                stock: request.stockItem.name
            })
        };

            return Array.from(requestsMap.entries()).map(
  ([stock, data]) => ({
    stock,
    requests: data.requests,
  

  })
).sort((a, b) => b.requests - a.requests).slice(0, 10)


}


export async function getRequestCount(){
    const userId = await getUserId();

    return await prisma.request.count({
        where:{userId}
    })
}


export async function getRequestFormData(requestId: string){
    const userId = await getUserId();

    const request = await prisma.request.findUnique({
        where:{userId, id: requestId},
        select:{
            customer: true,
            stockId:true,
            quantity:true,
            costCentreId:true,
            note: true
        }
    });

    return request;
}
