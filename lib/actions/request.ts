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

        const { customer, costCentreId, quantity, stockItem: stockId, notes } = parsed.data;

        await prisma.request.create({
            data: {
                customer,
                stockId,
                quantity: Number(quantity),
                costCentreId,
                status: "PENDING",
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

        const oldCount = stock.quantity;
        const requestCount = request.quantity;
        const updatedCount = oldCount - requestCount;
        
        




        revalidatePath('/requests');

        return { 
            success: true,
             message: `Request #${request.requestNumber} is now ready`, 
             updatedStock:{name: stock.name, requestCount, oldCount, updatedCount},
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

                updatedRequests.push(request.stockItem.name + " stock updated");

            };


        });

        revalidatePath('/requests')

        return {
            success: true,
            message: "Update successful",
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

        const ledger = await createRequestLedger(requestId);
        
        revalidatePath('/requests')

        return {
            success: true, 
            message: `Request #${request.requestNumber} is complete`,
            customer:request.customer, 
            issued: request.quantity, 
            costCentre: ledger?.costCentreName, 
            chargeAmount: Number(ledger?.totalCost),
            stockItem: request.stockItem.name
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

        stockIds.map(async (stockId) => {
            const request = await prisma.request.findFirst({
                where: { stockId, userId },
                select: {
                    id: true
                }
            });

            if (!request) return;

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
            success: true, message: stockIds.length + " requests were marked complete"
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

        const stock = await prisma.stock.update({
            where: { userId, id: request?.stockId },
            data: {
                quantity: {
                    increment: request?.quantity
                }
            },
            select: {
                name: true
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

        return { success: true, message: `${request?.quantity} x ${stock.name} was returned`, requestNumber: request?.requestNumber }
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








