"use server";

import z from "zod";
import { costCentreSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";


export async function createCostCentre(values: z.infer<typeof costCentreSchema>){
    const userId = await getUserId();

   try {
      const parsed = costCentreSchema.safeParse(values);

      if (!parsed.success){
     console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');

      };

    const centre = await prisma.costCentre.create({
        data:{
            userId,
            code: parsed.data.code,
            name: parsed.data.name

        },
        select:{
            name:true
        }
});

return {
    success: true, message: centre.name + " added"
}
   } catch (error) {
        console.error('Create cost centre error:', error);
        return {success: false, message: "Database error"}
   }
    
}