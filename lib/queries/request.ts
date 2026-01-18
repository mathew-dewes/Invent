"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getRequests(){
const userId = await getUserId();
const stock = await prisma.request.findMany({
    where: {
        userId,
        status:{
            not: "COMPLETE"
        }
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