"use server";

import z from "zod";
import { costCentreSchema } from "../schemas";
import { getUserId } from "./auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";


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


export async function updateCostCentre(values: z.infer<typeof costCentreSchema>, costCentreId: string){
    const userId = await getUserId();

    try {
        const parsed = costCentreSchema.safeParse(values);

        if (!parsed.success){
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        await prisma.costCentre.update({
            data:{
                name:parsed.data.name,
                code: parsed.data.code
            },
            where:{id: costCentreId, userId}
        });

        revalidatePath('/cost-centre');

        return {success: true, message: "Cost centre updated"}
    } catch (error) {
            console.error('Update cost centre error:', error);
          return {success: false, message: "Cost centre update failed"}
        
    }
};

export async function deleteCostCentre(costCentreId: string){
    const userId = await getUserId();

    try {
            const centre = await prisma.costCentre.delete({
        where:{
            userId, id: costCentreId
        }, 
        select:{
            name: true
        }
    });

    revalidatePath('/cost-centre')

    return {success: true, message: centre.name + " was removed"}

    } catch (error) {

        console.log(error);
        return {success: false, message: "There was an error"}
        
    }


}