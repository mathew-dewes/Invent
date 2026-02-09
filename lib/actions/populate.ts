"use server";

import { RequestStatus } from "@/generated/prisma/enums";
import { demoCostCentres, demoCustomers, demoStock, demoVendors, pickRandom, randomInt, weightedRequestDate } from "../helpers";
import prisma from "../prisma";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";


export async function LoadDemoData(){
    const userId = await getUserId();

    const stock = pickRandom(demoStock);
    const customer = pickRandom(demoCustomers);
    const costCentre = pickRandom(demoCostCentres);

    const qty = randomInt(1, 5);
    const status = pickRandom(["OPEN", "READY", "COMPLETE"] ) as RequestStatus;

    const requestDate = weightedRequestDate();

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
            )

         
            
        });

        revalidatePath('/vendors')

        return {success: true, message: "Vendors added"}

      
    } catch (error) {
        console.log(error);
             return {success: false, message: "There was an error"}
    }
    
}