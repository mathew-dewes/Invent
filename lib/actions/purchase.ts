"use server";

import z from "zod";
import { purchaseSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";





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
