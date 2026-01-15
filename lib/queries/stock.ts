"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getStock(){
const userId = await getUserId();
const vendors = await prisma.stock.findMany({
    where: {
        userId
    },
    select:{
        id: true,
        quantity: true,
        name:true,
        location: true,
        reorderPoint: true,
        maxStock: true,
        vendor:{
            select:{
                name: true
            }
        },
        unitCost: true,
        brand: true
    },

    orderBy: {
        createdAt: "desc"
    }

});


return vendors;


}