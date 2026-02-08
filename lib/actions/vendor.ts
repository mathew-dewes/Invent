"use server";

import z from "zod";
import { vendorSchema } from "../schemas";
import prisma from "../prisma";
import { redirect } from "next/navigation";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";

export async function createVendor(values: z.infer<typeof vendorSchema>){

    const userId = await getUserId();

    try {
        const parsed = vendorSchema.safeParse(values);
    if (!parsed.success) {
           console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { name, address, email, phone, contactName, PONumber } = parsed.data;

    await prisma.vendor.create({
        data:{
            name,
            address,
            email,
            phone,
            contactName,
            userId,
            PONumber: Number(PONumber)
        }
    });

    revalidatePath('/vendors')
    redirect('/vendors');

    } catch (error) {
    console.error('Create vendor error:', error);
    throw error;
        
    }
};


export async function updateVendor(values: z.infer<typeof vendorSchema>, vendorId:string){

    const userId = await getUserId();

    try {
        const parsed = vendorSchema.safeParse(values);
    if (!parsed.success) {
           console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { name, address, email, phone, PONumber, contactName } = parsed.data;

    await prisma.vendor.update({
        data:{
            name,
            address,
            email,
            phone,
            contactName,
            userId, 
            PONumber: Number(PONumber)
        },
        where:{id: vendorId}
    });

    revalidatePath('/vendors')


    } catch (error) {
    console.error('Create vendor error:', error);
    throw error;
        
    }
}


