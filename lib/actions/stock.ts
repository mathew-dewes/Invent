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

  
        

        const { name, brand, location, quantity, vendorId, unitCost, partNumber, maxStock, reorderPoint } = parsed.data;
    


        
        await prisma.stock.create({
            data: {
                name,
                brand,
                location,
                quantity: Number(quantity),
                userId,
                unitCost: new Prisma.Decimal(unitCost),
                partNumber,
                maxStock: Number(maxStock),
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

export async function updateStock(values: z.infer<typeof stockSchema>, stockId: string){
     const userId = await getUserId();

    try {
        const parsed = stockSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { name, brand, location, quantity, vendorId, unitCost, partNumber, maxStock, reorderPoint } = parsed.data;

        await prisma.stock.update({
            data: {
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
            },
            where:{id: stockId}
        });

        revalidatePath('/stock');


    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;

    }

    
}

export async function bulkUpdateStock(formData: FormData){
      const stockIds = formData.getAll("ids") as string[]
console.log(stockIds);

}

export async function deleteStock(formData: FormData) {
    const stockId = formData.get("id") as string
    const userId = await getUserId();

    if (!stockId || !userId) return

    try {

        await prisma.stock.delete({
            where:{
                userId, id: stockId
            }
        })


        revalidatePath('/stock')
    } catch (error) {
        console.error('Delete stock error:', error);
        throw error;
    }
}


export async function adjustInventory(id: string, requestedQuantity: number, requestId: string){

    
    const request = await prisma.request.findFirst({
        where:{id: requestId},
        include:{stockItem:true}
    });

    if (request){
        
        if (request.status == "COMPLETE"){
            return {
                success: false, message: "Request already marked complete"
            }
        }

        if (request.quantity <= request.stockItem.quantity){

       await prisma.stock.update({
            data:{
                quantity:{
                    decrement: requestedQuantity
                }
            },
            where:{id}
        });

        revalidatePath('/requests');

        return {
            success: true, message:"Inventory has been updated"
        }


        } else {
  return {
            success: false, message: "Inventory level is tow"
        }

        }
    
 
    } else {

        return {
            success: false, message: "Request not found"
        }
    }


}