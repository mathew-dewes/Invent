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

export async function updateStockCount(stockId: string, updateAmount: number){
    const userId = await getUserId();

    try {
    const stock = await prisma.stock.update({
        where:{userId, id: stockId},
        data:{
            quantity: updateAmount
        },
        select:{
            name:true
        }
    });

    return {success: true, message: `${stock.name} was updated`}
    } catch (error) {
        console.log(error);
        
    return {success: false, message: `There was an error`}
    }


}