"use server";

import z from "zod";
import { stockSchema } from "../schemas";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { Prisma } from "@/generated/prisma/client";



export async function createStock(values: z.infer<typeof stockSchema>) {

    const userId = await getUserId()

    try {
        const parsed = stockSchema.safeParse(values);




        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };




        const { name, brand, location, quantity, vendorId, unitCost, partNumber, reorderPoint } = parsed.data;




        await prisma.stock.create({
            data: {
                name,
                brand,
                location,
                quantity: Number(quantity),
                userId,
                unitCost: new Prisma.Decimal(unitCost),
                partNumber,
                reorderPoint: Number(reorderPoint),
                vendorId
            }
        });

        revalidatePath('/stock');


    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;

    }


}

export async function updateStock(values: z.infer<typeof stockSchema>, stockId: string) {
    const userId = await getUserId();

    try {
        const parsed = stockSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { name, brand, location, quantity, vendorId, unitCost, partNumber, reorderPoint } = parsed.data;

        await prisma.stock.update({
            data: {
                name,
                brand,
                location,
                quantity: Number(quantity),
                userId,
                unitCost: Number(unitCost),
                partNumber,
                reorderPoint: Number(reorderPoint),
                vendorId,
            },
            where: { id: stockId }
        });

        revalidatePath('/stock');


    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;

    }


}

export async function checkInventoryBatch(stockItems: {id: string, quantity: number }[]) {
    const stockIds = stockItems.map((item) => item.id);
    // id: string | undefined;
    // quantity: number;

    const stockRecords = await prisma.stock.findMany({
        where: { id: { in: stockIds } },
        select: {
            id: true,
            name: true,
            quantity: true,
            reorderPoint: true
        }
    });

    const results = stockItems.map((item) => {
        const stock = stockRecords.find((s) => s.id === item.id);
        if (!stock) {
            return {
                stockId: item.id,
                requestedQty: item.quantity,
                availableQty: 0,
                enoughStock: false,
                shortage: item.quantity,
                message: "Stock item not found",
            };
        }

        const enoughStock = stock.quantity >= item.quantity;
        return {
            stockId: stock.id,
            itemName: stock.name,

            requestedQty: item.quantity,
            availableQty: stock.quantity,

            enoughStock,
            shortage: enoughStock ? 0 : item.quantity - stock.quantity,

            isLow: stock.quantity <= stock.reorderPoint,
        };




    });


    const canFulfillAll = results.every((r) => r.enoughStock);

    

    return {
        canFulfillAll,
        results,
    };


}