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