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

export async function updateStock(values: z.infer<typeof stockSchema>, stockId: string){
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


};


export async function massIncreaseStockQuantity(updateData:{
    id: string | undefined, quantity: number | undefined
}[]){
     const userId = await getUserId();


  try {
      
    await Promise.all(
    updateData.map(async (item)=>{
        const res = await prisma.stock.updateMany({
            where:{userId, id: item.id},
            data:{
                quantity:{
                    increment: item.quantity
                }
            }
        });

            console.log(
      `Tried updating stock ${item.id}. Rows affected:`,
      res
    );
    })

    )
    



    

            console.log("Stock successfully updated 🚀");
  } catch (error) {

      console.error("Failed to update stock:", error);
    
    
  }




     
    


}

export async function massDecreaseStockQuantity(updateData:{
    id: string | undefined, quantity: number | undefined
}[]){
     const userId = await getUserId();

     console.log(updateData);

 



  try {
      
   await Promise.all(
    updateData.map(async (item)=>{
        const res = await prisma.stock.updateMany({
            where:{userId, id: item.id, quantity:{gt: item.quantity,}},
            data:{
                quantity:{
                    decrement: item.quantity
                }
            }
        });

   if (res.count === 0){
      console.warn(`Cannot decrement stock ${item.id}: insufficient quantity`);
   }
    })

    );

  
    



    

            console.log("Stock successfully updated 🚀");
  } catch (error) {

      console.error("Failed to update stock:", error);
    
    
  }




     
    


}


export async function checkInventory(stockRequests:{
    id: string | undefined, quantity: number | undefined}[]){

           const userId = await getUserId();
     const aggregated: Record<string, number> = {};


 stockRequests.forEach(({ id, quantity }) => {
    if (!id || !quantity) return;
    aggregated[id] = (aggregated[id] || 0) + quantity;
  });

   const stockIds = Object.keys(aggregated);

   try {
    
    const stockItems = await prisma.stock.findMany({
        where:{userId, id:{in: stockIds}}
    });

     const insufficient: { id: string; name:string, requested: number; available: number }[] = [];
       stockItems.forEach((stock) => {
    const requested = aggregated[stock.id];


    if (requested > stock.quantity) {
      insufficient.push({
        id: stock.id,
        name:stock.name,
        requested,
        available: stock.quantity
     
      });
    }
  });

  // 4. Return results
  if (insufficient.length > 0) {
    return {
      ok: false,
      insufficient,
    };
  }

  return { ok: true };

   } catch (error) {
    console.log(error);
    
      return { ok: false };
   }


}

export async function checkSingleStockItemQuantity(stockId: string, requestedQuantity: number){
const userId = await getUserId();

try {
    const stockItem = await prisma.stock.count({
        where:{userId, id: stockId, quantity:{
            gte: requestedQuantity
        }},
      
    });

    if (stockItem > 0){

        return {
            success: true
        }
    } else {

        return {
            success: false
        }
    }




} catch (error) {
    console.log(error);
    throw error
    
}
};

export async function decreaseStockQuantity(stockId:string, increaseQuantity: number){
const userId = await getUserId();

try {
    await prisma.stock.update({
        where:{userId, id: stockId},
        data:{quantity:{
            decrement:increaseQuantity
        }}
    })
} catch (error) {
    console.log("Stock adjustment failed", error);
    throw error
    
    
}
}