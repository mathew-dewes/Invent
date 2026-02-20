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

        const requestNumber = await generateRequestNumber(userId);

        const { customer, costCentreId, quantity, stockItem: stockId, notes } = parsed.data;

        const request = await prisma.request.create({
            data: {
                customer,
                stockId,
                quantity: Number(quantity),
                costCentreId,
                status: "PENDING",
                requestNumber,
                userId,
                note: notes
            },
            select:{
                requestNumber:true,
                customer:true
            }
            
        });
        
        revalidatePath('/requests');

        return {success: true, message: "Request #" + request.requestNumber + " was created for " + request.customer}




    } catch (error) {
        console.error('Create request error:', error);
        return {success: false, message: "There was an error"}

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



        const { customer, costCentreId, quantity, stockItem: stockId, notes } = parsed.data;

        await prisma.request.update({
            data: {
                customer,
                stockId,
                quantity: Number(quantity),
                costCentreId,
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


export async function markReady(requestId: string) {
    const userId = await getUserId();

    try {
        const request = await prisma.request.findUnique({
            where: { userId, id: requestId },
            select: {
                quantity: true,
                stockId: true,
                id: true,
                requestNumber:true
            }
        });

        if (!request) {

            return {
                success: false, message: "Request not found"
            }

        };

        const stock = await prisma.stock.findUnique({
            where: { userId, id: request.stockId },
            select: { quantity: true, name:true }
        });

        if (!stock) {
            return {
                success: false, message: "Stock not found"
            }
        }
        
        if (stock.quantity < request.quantity) {
            return {
                success: false, message: "Insufficient stock available"
            }
        };

        await prisma.$transaction([
            prisma.stock.update({
                where: {
                    userId,
                    id: request?.stockId,
                },
                data: {
                    quantity: {
                        decrement: request?.quantity
                    },

                }
            }),
            prisma.request.update({
                where: {
                    id: requestId
                },
                data: {
                    status: "READY"
                }
            })

        ]);





        revalidatePath('/requests');

        return { 
            success: true,
             message: `Request #${request.requestNumber} is now ready`, 

           };
           

    } catch (error) {
        console.log(error);
      return { 
            success: true,
             message: `Update failed`, 
   };


    }





}


export async function markAllReady(requestIds: string[]) {
    const userId = await getUserId();

    try {
        const updatedRequests: string[] = [];
        await prisma.$transaction(async (tx) => {
            for (const requestId of requestIds) {
                const request = await tx.request.findUnique({
                    where: { id: requestId, userId },
                    select: {
                        id: true,
                        quantity: true,
                        stockId: true,
                        requestNumber:true,
                        customer:true,
                        stockItem: {
                            select: {
                                name: true
                            }
                        }

                    }
                });

                if (!request) {
                    throw new Error("Request not found");
                }

                const stockUpdate = await tx.stock.updateMany({
                    where: {
                        id: request.stockId, userId,
                        quantity: {
                            gte: request.quantity
                        }
                    },
                    data: {
                        quantity: {
                            decrement: request.quantity
                        }
                    }
                });

                if (stockUpdate.count === 0) {
                    throw new Error("Insufficient stock");
                }

                await tx.request.update({
                    where: { id: requestId, userId },
                    data: { status: "READY" }
                });

                updatedRequests.push("Request #" + request.requestNumber + " for " + request.customer + " is ready");

            };


        });

        revalidatePath('/requests')

        return {
            success: true,
            updatedRequests
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        };

    }





};


export async function MarkComplete(requestId: string) {
    const userId = await getUserId();
    try {
        const request = await prisma.request.update({
            where: { userId, id: requestId },
            data: {
                status: "COMPLETE",
                completedAt: new Date()
            },
            select:{
                requestNumber:true,
                customer:true,
                quantity:true,
                stockItem:{
                    select:{
                        name: true
                    }
                }
            }
        });

      await createRequestLedger(requestId);
        
        revalidatePath('/requests')

        return {
     
            message: `Request #${request.requestNumber} is now complete`,
     
        }


    } catch (error) {
        console.log(error);
        return {
            success: false, message: "There was an error"
        }


    }
}

export async function markAllComplete(stockIds: string[]) {

    const userId = await getUserId();
   

    try {
    
        const requests: 
        {
            requestNumber: number, 
            customer: string, 
            stockItem: string, 
            requestQuantity: number,
            chargeCost: number, 
            costCentre: string}[] = [];

        stockIds.map(async (stockId) => {
            const request = await prisma.request.findFirst({
                where: { stockId, userId },
                select: {
                    id: true,
                    requestNumber:true,
                    customer: true,
                    quantity:true,
                    costCentre:{
                        select:{
                            name: true
                        }
                    },
                    stockItem:{
                        select:{
                            name:true,
                            unitCost: true
                         
                        }
                    }
                }
            });

            if (!request) return;

     

            requests.push({
                requestNumber: request.requestNumber, 
                customer: request.customer, 
                requestQuantity: request.quantity, 
                stockItem: request.stockItem.name,
                costCentre: request.costCentre.name,
                chargeCost: Number(request.stockItem.unitCost) * request.quantity
            
            })

            await createRequestLedger(request.id)
        })

   await prisma.request.updateMany({
            where: { userId, stockId: { in: stockIds } },
            data: {
                status: "COMPLETE",
                completedAt: new Date()
            },
            



        });



        revalidatePath('/requests')

        return {
            success: true, requests
        }


    } catch (error) {
        console.log(error);


    }


};


export async function cancelRequest(requestId: string) {
    const userId = await getUserId();



    const request = await prisma.request.delete({
        where: { userId, id: requestId }, select: { requestNumber: true }
    });

    revalidatePath('/requests');

    return {
        success: true, message: `Request #${request.requestNumber} was removed`
    }

}


export async function cancelAndReturnRequest(requestId: string) {
    const userId = await getUserId();
    try {
        const request = await prisma.request.findFirst({
            where: { userId, id: requestId },
            select: {
                quantity: true,
                stockId: true,
                requestNumber: true,
                status: true,
            }
        });

   await prisma.stock.update({
            where: { userId, id: request?.stockId },
            data: {
                quantity: {
                    increment: request?.quantity
                }
            }
        });

        if (request?.status == "COMPLETE") {

            await prisma.costLedger.deleteMany({
                where: { userId, sourceId: requestId }
            });
        }

        await prisma.request.delete({
            where: { id: requestId, userId }
        })

        revalidatePath('/requests')

        return { success: true, message: `Request #${request?.requestNumber} was removed`}
    } catch (error) {
        console.log(error);
        return { success: false, message: `There was an error` }



    }



}


export async function clearData() {
    const userId = await getUserId();

    try {

        await prisma.request.deleteMany({
            where: { userId }
        })

        await prisma.purchase.deleteMany({
            where: { userId }
        })

        await prisma.costLedger.deleteMany({
            where: { userId }
        });

        await prisma.costCentre.deleteMany({
            where: { userId }
        })

        revalidatePath('/requests')
        revalidatePath('/purchases')
        revalidatePath('/finance');
        revalidatePath('/cost-centres');

        return {
            success: true, message: "Tables cleared"
        }
    } catch (error) {
        console.log(error);

        return {
            success: false, message: "The was an error clearing data"
        }
    }

}








