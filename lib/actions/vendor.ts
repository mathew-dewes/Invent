"use server";

import z from "zod";
import { vendorSchema } from "../schemas";
import prisma from "../prisma";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function createVendor(values: z.infer<typeof vendorSchema>){

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    if (!user) throw new Error('Unauthorized')

    try {
        const parsed = vendorSchema.safeParse(values);
    if (!parsed.success) {
           console.error('Validation errors:', parsed.error.format());
            throw new Error('Validation failed');
        };

        const { name, address, email, phone, contactName } = parsed.data;

    await prisma.vendor.create({
        data:{
            name,
            address,
            email,
            phone,
            contactName,
            userId: user?.id
        }
    })

    } catch (error) {
    console.error('Create vendor error:', error);
    throw error;
        
    }
}