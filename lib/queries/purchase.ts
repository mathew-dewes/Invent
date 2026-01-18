"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";


export async function getPurchases(){
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

    return purchases;
}