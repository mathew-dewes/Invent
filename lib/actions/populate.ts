"use server";

import { RequestStatus } from "@/generated/prisma/enums";
import { aisleLocation, demoCostCentres, demoCustomers, demoStock, demoVendors, generatePartNumber, pickRandom, randomInt, weightedRequestDate } from "../helpers";
import prisma from "../prisma";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";


export async function LoadDemoData(){
    const userId = await getUserId();

    const stock = pickRandom(demoStock);
    const customer = pickRandom(demoCustomers);
    const costCentre = pickRandom(demoCostCentres);


    try {
        // Load cost centres
        await prisma.$transaction(async(tx)=>{
            const costCentres = await Promise.all(
                demoCostCentres.map((cc, i)=>{
                    return tx.costCentre.create({
                        data:{
                            code: "CC" + 10 + i,
                            name: cc,
                            userId
                        }
                    })
                })
            );

            // Load vendors
            const vendors = await Promise.all(
                demoVendors.map((name, i)=>{
                    return tx.vendor.create({
                        data:{
                            name,
                            email: `${name.toLowerCase().replace(/\s/g, "")}@demo.co.nz`,
                            contactName: "Accounts Team",
                            userId, 
                            PONumber: 20000 + i

                        }
                    })
                })
            );

            // Load stock
            const stockItems = await Promise.all(
                demoStock.map((stock)=>{
                    return tx.stock.create({
                        data:{
                            name:stock.name,
                            brand: stock.name,
                            partNumber: generatePartNumber(),
                            reorderPoint: 20,
                            location:pickRandom(aisleLocation),
                            vendorId: pickRandom(vendors).id,
                            userId,
                            unitCost: randomInt(20, 150),
                            quantity: randomInt(5,60),

                        }
                    })
                })
            );

       

            const costCentreIds = costCentres.map((item)=>{
                return item.id;
            })

        for (let i = 0; i < 20; i++){
    const stock = pickRandom(stockItems)
    const costCentre = pickRandom(costCentres)
    const customer = pickRandom(demoCustomers)
            


    const qty = randomInt(1, 5);
    const status = pickRandom(["OPEN", "READY", "COMPLETE"] ) as RequestStatus;

    const requestDate = weightedRequestDate();

    const request = await tx.request.create({
        data:{
            customer,
            requestNumber: 5000 + i,
            quantity: qty,
            status,
            stockId:stock.id,
            costCentreId: pickRandom(costCentreIds),
            userId,
            createdAt: requestDate!
        }
    });

    if (status == "COMPLETE"){
         await tx.stock.update({
          where: { id: stock.id },
          data: { quantity: { decrement: qty } },
        })
    }
    





        }
            
        });

 

    

        return {success: true, message: "Data added"}

      
    } catch (error) {
        console.log(error);
             return {success: false, message: "There was an error"}
    }
    
}


export async function clearDemoData(){
    const userId = await getUserId();

    try {
         await prisma.stock.deleteMany({
        where:{userId}
    });
    await prisma.costCentre.deleteMany({
        where:{userId},
    
    })
    await prisma.vendor.deleteMany({
        where:{userId}
    })
   

    return {success: true, message: "Data deleted"}
    } catch (error) {
        console.log(error);
        

         return {success: false, message: "Delete failed"}

        
    }


}