"use server";

import z from "zod";
import { stockSchema } from "../schemas";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../prisma";

export async function createStock(values: z.infer<typeof stockSchema>){

    const userId = await getUserId();

    try {
        const parsed = stockSchema.safeParse(values);

    if (!parsed.success) {
           console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { name, brand, location, quantity, vendorId, unitCost, partNumber, maxStock, reorderPoint } = parsed.data;
console.log({
  name,
  brand,
  location,
  quantity,
  vendorId,
  unitCost,
  partNumber,
  maxStock,
  reorderPoint,
  userId
});
    await prisma.stock.create({
        data:{
            name,
            brand,
            location,
            quantity: Number(quantity),
            userId,
            unitCost: Number(unitCost),
            partNumber,
            maxStock: Number(maxStock),
            reorderPoint: Number(reorderPoint),
            vendorId
        }
    });

    revalidatePath('/stock')
    redirect('/stock');

    } catch (error) {
    console.error('Create vendor error:', error);
    throw error;
        
    }
}