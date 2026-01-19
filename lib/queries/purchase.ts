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