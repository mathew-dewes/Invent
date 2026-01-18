"use server";

import z from "zod";
import { purchaseSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";


export async function createPurchase(values: z.infer<typeof purchaseSchema>){

    console.log(values);
    

    const userId = await getUserId();

    try {
        const parsed = purchaseSchema.safeParse(values);



        
            if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };
            const purchaseNumber = await generatePurchaseNumber();
            
                const {item, quantity, poNumber, notes} = parsed.data;


                const stockItem = await prisma.stock.findUnique({
                    where: {id: item}
                });

                const totalCost = stockItem!.unitCost * Number(quantity);
    

        await prisma.purchase.create({
            data:{
                stockId: item,
                quantity: Number(quantity),
                purchaseNumber,
                totalCost,
                userId,
                status: "PLACED",
                notes,
                PO: poNumber
            }
        })




    } catch (error) {
        console.error('Create vendor error:', error);
        throw error;
        
    }
}

export async function generatePurchaseNumber(): Promise<number>{
  let unique = false;
  let purchaseNumber = 0;

  while (!unique){
    purchaseNumber = Math.floor(Math.random() * 99999) + 1

    const existing = await prisma.purchase.findUnique({
        where: {purchaseNumber}
    });

    if (!existing) unique = true;


  }


    return purchaseNumber
};

export async function changePurchaseStatus(formData: FormData, status: PurchaseStatus){
 const purchaseId = formData.get("purchaseId") as string;
 const purchaseQuantity = formData.get("purchaseQuantity") as string;

 console.log(purchaseQuantity);
 
 

    try {
        await prisma.purchase.update({
            where:{id: purchaseId},
            data:{status, stockItem:{
                update:{
                    quantity:{
                        increment:Number(purchaseQuantity)
                    }
                }
            }}
        });

        revalidatePath('/purchases')

        return {
            success: true
        }
    } catch (error) {
        console.error('Purchase failed:', error);
        throw error;
    }
    

}