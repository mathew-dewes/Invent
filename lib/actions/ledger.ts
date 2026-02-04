"use server";

import prisma from "../prisma";
import { getUserId } from "./auth";

export async function createRequestLedger(requestId: string){
    const userId = await getUserId();

    try {

        const request = await prisma.request.findUnique({
            where:{userId, id: requestId},
            select:{
                id:true,
                customer:true,
                quantity:true,
                costCentre:true,
                stockItem:{
                    select:{
                        unitCost:true,
                        id:true,
                        name:true
                 
                    }
                }
            }
        });

        if (!request) return

        await prisma.costLedger.create({
            data:{
                type: "REQUEST",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                stockId: request.stockItem.id,
                stockName: request.stockItem.name,
                quantity: request.quantity,
                reference: request.costCentre,
                totalCost: Number(request.stockItem.unitCost) * request.quantity,
                unitCost: request.stockItem.unitCost,
                costCentre:request.costCentre,
                userId,
                requestId: request.id,
                requestee: request.customer

            }
        })
    } catch (error) {

        console.log(error);
        
        
    }
}

export async function createPurchaseLedger(purchaseId: string){
        const userId = await getUserId();

             const purchase = await prisma.purchase.findUnique({
            where:{userId, id: purchaseId},
            select:{
                id:true,
                purchaseNumber:true,
                vendor:{
                    select:{
                        name:true
                    }
                },
                quantity:true,
                stockItem:{
                    select:{
                        unitCost:true,
                        id:true,
                        name:true
                 
                    }
                }
            }
        });


        if (!purchase) return;

        await prisma.costLedger.create({
            data:{
                 type: "PURCHASE",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                stockId: purchase.stockItem.id,
                stockName: purchase.stockItem.name,
                quantity: purchase.quantity,
                reference: String(purchase.purchaseNumber),
                totalCost: Number(purchase.stockItem.unitCost) * purchase.quantity,
                unitCost: purchase.stockItem.unitCost,
                userId,
                requestId: purchase.id,
                requestee: purchase.vendor.name
            }
        })
}