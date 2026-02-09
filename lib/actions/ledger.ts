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
                requestNumber:true,
                customer:true,
                quantity:true,
                costCentre:true,
                stockItem:{
                    select:{
                        unitCost:true,
                        id:true,
                        name:true,
                        vendor:{
                            select:{
                                name:true
                            }
                        }
                 
                    }
                },
                
            }
        });

        if (!request) return;

        const reference = `REQ-${request.requestNumber}`;


        await prisma.costLedger.create({
            data:{
                sourceType: "REQUEST",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                stockId: request.stockItem.id,
                stockName: request.stockItem.name,
                quantity: request.quantity,
                totalCost: Number(request.stockItem.unitCost) * request.quantity,
                unitCost: request.stockItem.unitCost,
                costCentreId:request.costCentre.id,
                userId,
                sourceId: requestId,
                reference,
                vendorName: request.stockItem.vendor.name


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

        const reference = `PUR-${purchase.purchaseNumber}`;

        await prisma.costLedger.create({
            data:{
                sourceType: "PURCHASE",
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                stockId: purchase.stockItem.id,
                stockName: purchase.stockItem.name,
                quantity: purchase.quantity,
                totalCost: Number(purchase.stockItem.unitCost) * purchase.quantity,
                unitCost: purchase.stockItem.unitCost,
                userId,
                sourceId: purchaseId,
                reference,
                vendorName:purchase.vendor.name
            }
        })
}