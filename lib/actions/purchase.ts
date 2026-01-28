"use server";

import z from "zod";
import { purchaseSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { massIncreaseStockQuantity } from "./stock";
import { createLedger } from "./request";




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
            include: { vendor: true }
        });

        const totalCost = Number(stockItem!.unitCost) * Number(quantity);


        await prisma.purchase.create({
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
            }
        })




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

export async function massUpdatePurchase(stockIds: string[], status: PurchaseStatus | null, stockIdsAndQuantity:
    { id: string | undefined, quantity: number | undefined }[]) {

    if (!status || stockIds.length === 0) return

    const userId = await getUserId();



    try {

        if (status === "RECEIVED") {

            await massIncreaseStockQuantity(stockIdsAndQuantity);


            await Promise.all(
                stockIds.map(async (id) => {
                    await createLedger("PURCHASE", id)


                })

            )

        };

        
        await prisma.purchase.updateMany({
            data: {
                status: status as PurchaseStatus
            },
            where: { id: { in: stockIds }, userId },


        })


        revalidatePath('/purchases');


    } catch (error) {
        console.error('Update purchase error:', error);
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

export async function changePurchaseStatus(formData: FormData, status: PurchaseStatus) {
    const purchaseId = formData.get("purchaseId") as string;
    const purchaseQuantity = formData.get("purchaseQuantity") as string;

    console.log(purchaseQuantity);



    try {
        await prisma.purchase.update({
            where: { id: purchaseId },
            data: {
                status, stockItem: {
                    update: {
                        quantity: {
                            increment: Number(purchaseQuantity)
                        }
                    }
                }
            }
        });

        revalidatePath('/purchases')

        return {
            success: true
        }
    } catch (error) {
        console.error('Purchase failed:', error);
        throw error;
    }


};


export async function markReceived(purchaseId: string, stockAmount: number){
const userId = await getUserId();

try {
await prisma.purchase.update({
        where:{userId, id: purchaseId},
        data:{
            status: "RECEIVED",
            stockItem:{
                update:{
                    quantity:{
                        increment: stockAmount
                    }
                }
            }
        }
    });



    await createLedger("PURCHASE", purchaseId);

    revalidatePath('/purchases');

    return {
        success: true, message:'Purchase marked Received'
    }
} catch (error) {
        console.log(error);
    throw error;
   
    
    
}

}


