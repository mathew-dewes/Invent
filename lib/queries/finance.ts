"use server";

import { FinanceType } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getStartDate } from "../helpers";
import { TimeFrame } from "../types";




export async function getFinanceData(filter?: FinanceType, timeFrame?:TimeFrame){
    const userId = await getUserId();

    const startDate = getStartDate(timeFrame)


    const finances = await prisma.costLedger.findMany({
        where:{userId, 
            createdAt:{
                gte: startDate
            }
        },
    
        
    
        orderBy:{
            createdAt: "desc"
        }
    });

    const serialisedFinances = finances.map((item) => ({
        ...item,
        totalCost: item.totalCost.toString(),
        unitCost: item.unitCost.toString(),
    }));

    const requests = serialisedFinances.filter(
        item => item.sourceType === "REQUEST"
    );

    const purchases = serialisedFinances.filter(
        item => item.sourceType === "PURCHASE"
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
        select:{sourceType: true}
    });

    const typeCounts = {
        REQUEST: finances.filter((t => t.sourceType === "REQUEST" )).length,
        PURCHASE: finances.filter((t => t.sourceType === 'PURCHASE')).length
    };

    return typeCounts
};

export async function getRecentActivity(){
    const userId = await getUserId();

    const activities = await prisma.costLedger.findMany({
        where:{userId},
        orderBy:{
            createdAt: "desc"
        },
        take: 10,
        select:{
            id: true,
            createdAt:true,
            sourceType:true,
            reference: true,
            stockName: true,
            vendorName: true,
            costCentre:true,
            quantity:true,
            totalCost:true
        }
    });

       const serialisedActivities = activities.map((item) => ({
        ...item,
        totalCost: item.totalCost.toNumber(),
  
    }));

    return serialisedActivities;
}