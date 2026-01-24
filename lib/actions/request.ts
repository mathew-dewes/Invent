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

        const {customer, plant: plantNumber, quantity, stockItem: stockId, notes} = parsed.data;

        await prisma.request.create({
            data:{
                customer,
                stockId,
                quantity: Number(quantity),
                plantNumber,
                status: "OPEN",
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


export async function updateRequest(values: z.infer<typeof requestSchema>, requestId: string){
       const userId = await getUserId();

    try {
        const parsed = requestSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };



        const {customer, plant: plantNumber, quantity, stockItem: stockId, notes} = parsed.data;

        await prisma.request.update({
            data:{
                customer,
                stockId,
                quantity: Number(quantity),
                plantNumber,
                userId,
                note: notes
            },
            where:{id: requestId}
        })
        

        revalidatePath('/requests');


    } catch (error) {
        console.error('Create request error:', error);
        throw error;

    }

};

export async function cancelRequest(formData: FormData){
const userId = await getUserId();
const requestId = formData.get("requestId") as string;




if (!userId || !requestId) return;

try {
    await prisma.request.delete({
        where:{userId, id: requestId}
    });

    revalidatePath('/requests')
} catch (error) {
      console.error('Cancel request error:', error);
        throw error;
}
 
    

}

export async function cancelRequests(requestIds: string[]){
    const userId = await getUserId();

    if (!requestIds) return;

    try {
        await prisma.request.deleteMany({
            where:{id: {in: requestIds}, userId}
        });

revalidatePath('/requests');
    } catch (error) {
            console.error('Create request error:', error);
        throw error;
    }


};




export async function updateRequestStatus(requestsIds: string[], status: RequestStatus){
       const userId = await getUserId();

       try {
              await prisma.request.updateMany({
            data:{
             status: status as RequestStatus,

             
             
            },
            where:{id: {in: requestsIds}, userId, 
            
  },
            
            
        });

           revalidatePath('/requests');
       } catch (error) {
             console.error('Create request error:', error);
        throw error;
       }


    }



    export async function changeRequestStatus(formData: FormData, status: RequestStatus){


    const requestId = formData.get("requestId") as string;
    const userId = await getUserId();

    if (!requestId || !userId) return;

    try {
        await prisma.request.update({
            where:{id: requestId, userId},
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

export async function markRequestReady(requestsIds: string[], status: RequestStatus = "READY", stockIdsAndQuantity: 
    {id: string | undefined, quantity: number | undefined}[]){
     if (!status || requestsIds.length === 0) return;
        const userId = await getUserId();

if (status == "READY"){

        await Promise.all(
            stockIdsAndQuantity.map(async(item)=>{
               await prisma.stock.updateMany({
                        where: {id: item.id, userId},
                        data:{
                            quantity:{
                                decrement: item.quantity
                            },
                            
                        },
                    
                    }
                    )
         
                    
            })
            
        )
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


