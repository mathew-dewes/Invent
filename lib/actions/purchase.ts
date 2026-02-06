"use server";

import z from "zod";
import { purchaseSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { createPurchaseLedger } from "./ledger";
import { revalidatePath } from "next/cache";





export async function createPurchase(values: z.infer<typeof purchaseSchema>) {


    const userId = await getUserId();

    try {
        const parsed = purchaseSchema.safeParse(values);




        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };
        const purchaseNumber = await generatePurchaseNumber();

        const { item, quantity, poNumber, notes } = parsed.data;


        const stockItem = await prisma.stock.findUnique({
            where: { id: item, userId },
            include: { vendor: true },

        });

        if (!stockItem) return

        const totalCost = Number(stockItem!.unitCost) * Number(quantity);


        const purchase = await prisma.purchase.create({
            data: {
                stockId: item,
                quantity: Number(quantity),
                purchaseNumber,
                totalCost,
                userId,
                status: "PLACED",
                notes,
                PO: poNumber,
                vendorId: stockItem!.vendorId
            },
            select: {
                id: true
            }
        });

        await createPurchaseLedger(purchase.id)




    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;

    }
}


export async function updatePurchase(values: z.infer<typeof purchaseSchema>, purchaseId: string) {

    const userId = await getUserId();

    try {
        const parsed = purchaseSchema.safeParse(values);




        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };


        const { item, quantity, poNumber, notes } = parsed.data;


        const stockItem = await prisma.stock.findUnique({
            where: { id: item }
        });

        const totalCost = Number(stockItem!.unitCost) * Number(quantity);


        await prisma.purchase.update({
            data: {
                stockId: item,
                quantity: Number(quantity),
                totalCost,
                userId,
                notes,
                PO: poNumber
            },
            where: { id: purchaseId }
        })




    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;

    }
}



export async function generatePurchaseNumber(): Promise<number> {
    let unique = false;
    let purchaseNumber = 0;

    while (!unique) {
        purchaseNumber = Math.floor(Math.random() * 99999) + 1

        const existing = await prisma.purchase.findUnique({
            where: { purchaseNumber }
        });

        if (!existing) unique = true;


    }


    return purchaseNumber
};


export async function markReceived(purchaseId: string) {
    const userId = await getUserId();

    try {
        await prisma.$transaction(async (tx) => {
            const purchase = await tx.purchase.findUnique({
                where: { id: purchaseId, userId },
                select: {
                    id: true, quantity: true, stockId: true,
                    stockItem: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (!purchase) {
                throw new Error("Request not found");
            };

            await tx.stock.update({
                where: { userId, id: purchase.stockId },
                data: {
                    quantity: {
                        increment: purchase.quantity
                    }
                }
            });

            await tx.purchase.update({
                where: { userId, id: purchase.id },
                data: {
                    status: "RECEIVED"
                }
            });


        });

        revalidatePath('/purchases');

        return {
            success: true,
            message: 'Puchases updated',

        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        };
    }
}

export async function markAllReceived(purchaseIds: string[]) {
    const userId = await getUserId();

    try {

        const updatedPurchases: string[] = [];

        await prisma.$transaction(async (tx) => {
            for (const puchaseId of purchaseIds) {
                const purchase = await tx.purchase.findUnique({
                    where: { id: puchaseId, userId },
                    select: {
                        id: true,
                        quantity: true,
                        stockId: true,
                        stockItem: {
                            select: {
                                name: true,

                            }
                        }
                    }
                });

                if (!purchase) {
                    throw new Error("Request not found");
                }
                await tx.stock.update({
                    where: { userId, id: purchase.stockId },
                    data: {
                        quantity: {
                            increment: purchase.quantity
                        }
                    }
                });

                await tx.purchase.update({
                    where: { userId, id: purchase.id },
                    data: {
                        status: "RECEIVED"
                    }
                });
                updatedPurchases.push(purchase.stockItem.name)
            };
        });

        revalidatePath('/purchases');

        return {
            success: true,
            message: 'Puchases updated',
            updatedPurchases
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        };

    }

}
