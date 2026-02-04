"use server";

import z from "zod";
import { requestSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { generateRequestNumber } from "./helper";
import { createRequestLedger } from "./ledger";



export async function createRequest(values: z.infer<typeof requestSchema>) {

    const userId = await getUserId();

    try {
        const parsed = requestSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const requestNumber = await generateRequestNumber();

        const { customer, costCentre, quantity, stockItem: stockId, notes } = parsed.data;

        await prisma.request.create({
            data: {
                customer,
                stockId,
                quantity: Number(quantity),
                costCentre,
                status: "OPEN",
                requestNumber,
                userId,
                note: notes
            }
        })


        revalidatePath('/requests');


    } catch (error) {
        console.error('Create request error:', error);
        throw error;

    }


};


export async function updateRequest(values: z.infer<typeof requestSchema>, requestId: string) {
    const userId = await getUserId();

    try {
        const parsed = requestSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };



        const { customer, costCentre, quantity, stockItem: stockId, notes } = parsed.data;

        await prisma.request.update({
            data: {
                customer,
                stockId,
                quantity: Number(quantity),
                costCentre,
                userId,
                note: notes
            },
            where: { id: requestId }
        })


        revalidatePath('/requests');


    } catch (error) {
        console.error('Create request error:', error);
        throw error;

    }

};



export async function markAllReady(stockIdsAndQuantity:
    { id: string | undefined, quantity: number | undefined }[]) {

    const userId = await getUserId();
    const lowStockItems: string[] = [];

    try {
        await Promise.all(
            stockIdsAndQuantity.map(async (item) => {
    
                await prisma.stock.update({
                    where: { id: item.id, userId },
                    data: {
                        quantity: {
                            decrement: item.quantity
                        },
                        requests: {
                            updateMany: {
                                where: {
                                    stockId: item.id,
                                    status: "OPEN"
                                },
                                data: {
                                    status: "READY"
                                }
                            }
                        }

                    },

                }
                )

            }));

        revalidatePath('/requests');

          if (lowStockItems.length > 0) {
    return {
      success: false,
      message: `insufficient stock: ${lowStockItems.join(", ")}`,
    }
  }

        return {
            success: true, message: "Stock has been adjusted"
        };


    } catch (error) {
        console.log(error);
        return {
            success: false, message: "Inventory updated failed"
        }


    }



};

export async function markAllComplete(stockIds: string[]){

    const userId = await getUserId();

    try {

        stockIds.map(async (stockId)=>{
            const request = await prisma.request.findFirst({
                where:{stockId, userId},
                select:{
                    id:true
                }
            });

            if (!request) return;
            
            await createRequestLedger(request.id)
        })
    
        await prisma.request.updateMany({
            where:{userId, stockId:{in: stockIds}},
            data:{
                status: "COMPLETE"
            },
            
            
            
        });

        
    
        revalidatePath('/requests')

        return {
            success: true, message: stockIds.length + " requests were marked complete"
        }


    } catch (error) {
        console.log(error);
        
        
    }
    

}









