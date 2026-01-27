"use server";

import { FinanceType } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getFinanceData(filter?: FinanceType){
    const userId = await getUserId();

    const finances = await prisma.costLedger.findMany({
        where:{userId}
    });

    const serialisedFinances = finances.map((item) => ({
        ...item,
        totalCost: item.totalCost.toString(),
        unitCost: item.unitCost.toString()
    }));

    const requests = serialisedFinances.filter(
        item => item.type === "REQUEST"
    );

    const purchases = serialisedFinances.filter(
        item => item.type === "PURCHASE"
    );

    if (filter === "REQUEST"){
        return requests;
    } else if (filter == "PURCHASE") {
        return purchases;
    } else {
        
   return serialisedFinances;
    }

 
};


export async function getFinanceTypeCount(){
    const userId = await getUserId();

    const finances = await prisma.costLedger.findMany({
        where:{userId},
        select:{type: true}
    });

    const typeCounts = {
        REQUEST: finances.filter((t => t.type === "REQUEST" )).length,
        PURCHASE: finances.filter((t => t.type === 'PURCHASE')).length
    };

    return typeCounts
}