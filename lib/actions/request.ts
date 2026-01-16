"use server";

import z from "zod";
import { requestSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { RequestStatus } from "@/generated/prisma/enums";


export async function createRequest(values: z.infer<typeof requestSchema>) {

    const userId = await getUserId();

    try {
        const parsed = requestSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const requestNumber = await generateRequestNumber();

        const {customer, plant: plantNumber, quantity, status, stockItem: stockId, notes} = parsed.data;

        await prisma.request.create({
            data:{
                customer,
                stockId,
                quantity: Number(quantity),
                plantNumber,
                status,
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

  
}

export async function generateRequestNumber(): Promise<number>{
  let unique = false;
  let requestNumber = 0;

  while (!unique){
    requestNumber = Math.floor(Math.random() * 99999) + 1

    const existing = await prisma.request.findUnique({
        where: {requestNumber}
    });

    if (!existing) unique = true;


  }


    return requestNumber
};


export async function changeRequestStatus(formData: FormData, status: RequestStatus){


    const requestId = formData.get("requestId") as string;
    const userId = await getUserId();

    if (!requestId || !userId) return;

    try {
        await prisma.request.update({
            where:{id: requestId},
            data:{status}
        });

        revalidatePath('/requests')
        return {
            success: true
        }
    } catch (error) {
         console.error('Request update error:', error);
        throw error;
    }

         
    
    


          
}