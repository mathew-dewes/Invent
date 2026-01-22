"use server";

import { RequestStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getRequests(filter?: RequestStatus){
const userId = await getUserId();
const requests = await prisma.request.findMany({
    where: {
        userId,
    },


    orderBy: {
        createdAt: "desc"
    },

    select:{
        id: true,
        requestNumber: true,
        createdAt: true,
        customer: true,
        stockItem:{
            select:{
                id: true,
                name:true,
                quantity:true
            }
        },
        quantity: true,
        status: true,
        plantNumber: true,
        note: true
    }

});



const openRequests = requests.filter(
    item => item.status === "OPEN"
);

const readyRequests = requests.filter(
    item => item.status === "READY"
);
const completeRequests = requests.filter(
    item => item.status === "COMPLETE"
);

if (filter === "OPEN"){
    return openRequests;
} else if (filter === "COMPLETE"){
    return completeRequests;
} else if (filter === "READY"){
    return readyRequests;
} else {
    return openRequests;
}



}


export async function getRequestCardData(){
    const userId = await getUserId();
    const request = await prisma.request.findMany({
        where:{userId},
        select:{
            status:true,
            customer:true,
            quantity:true,
            stockItem:{
                select:{
                    name:true,
                  
                }
            }
        }
    });

    return request;
}

export async function getRequestChartData(){
        const userId = await getUserId();

   const data = await prisma.request.groupBy({
  by: ["status"],
  where: { userId },
  _count: {
    _all: true,
  },
});

const statusMap = {
  OPEN: "Open",
  PENDING: "Pending",
  READY: "Ready",

} as const;

const base = Object.keys(statusMap).map(status => ({
  name: statusMap[status as keyof typeof statusMap],
  requests: 0,
  status: status as RequestStatus,
}));

const formatted = base.map(item => {
  const found = data.find(d => d.status === item.status);

  return {
    ...item,
    requests: found ? found._count._all : 0,
  };
});

return formatted
}




export async function getRequestsByStatusCount(){
        const userId = await getUserId();

        const requests = await prisma.request.findMany({
            select:{
                status:true
            },
            where:{userId}
        });


        const queryCounts = {
            OPEN:requests.filter(q => q.status === "OPEN").length,
            READY: requests.filter(q => q.status === "READY").length,
            COMPLETE: requests.filter(q => q.status === "COMPLETE").length
        }

          return queryCounts
}

export async function getRequestById(id: string){
    const userId = await getUserId();
const requests = await prisma.request.findUnique({
    where: {
        userId, id
    },

    select:{
        id: true,
        requestNumber: true,
        createdAt: true,
        customer: true,
        stockItem:{
            select:{
                id: true,
                name:true,
                quantity:true
            }
        },
        quantity: true,
        status: true,
        plantNumber: true,
        note: true
    }

});

return requests;
}

export async function getCompletedRequests(){
    const userId = await getUserId();
const stock = await prisma.request.findMany({
    where: {
        userId,
        status:"COMPLETE"
    },


    orderBy: {
        createdAt: "desc"
    },

    select:{
        id: true,
        requestNumber: true,
        createdAt: true,
        customer: true,
        stockItem:{
            select:{
                id: true,
                name:true,
                quantity:true
            }
        },
        quantity: true,
        status: true,
        plantNumber: true,
        note: true
    }

});


return stock;
}