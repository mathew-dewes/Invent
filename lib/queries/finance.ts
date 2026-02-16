"use server";

import { FinanceType } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getStartDate } from "../helpers";
import { TimeFrame } from "../types";
import { getStockLevels } from "./stock";




export async function getFinanceData(filter?: FinanceType, timeFrame?:TimeFrame){
    const userId = await getUserId();

    const startDate = getStartDate(timeFrame)


    const finances = await prisma.costLedger.findMany({
        where:{userId, 
            createdAt:{
                gte: startDate
            },
            
        },
        select:{
            id: true,
            createdAt:true,
            sourceType:true,
            reference:true,
            stockName:true,
            vendorName:true,
            quantity:true,
            unitCost:true,
            totalCost:true,
            customerName: true,
            costCentre:{
                select:{
                    name:true
                }
            },
            
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
            costCentre:{select:{
                name: true
            }},
            quantity:true,
            totalCost:true
        }
    });

       const serialisedActivities = activities.map((item) => ({
        ...item,
        totalCost: item.totalCost.toNumber(),
  
    }));

    return serialisedActivities;
};


export async function getLastMonthStockUsage(){
    const userId = await getUserId();
      const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const usage = await prisma.costLedger.groupBy({
        by:["stockId", "stockName"],
        where:{
            userId,
            sourceType: "REQUEST",
            createdAt:{
                gte: thirtyDaysAgo
            },
            },
            _sum:{
                quantity: true
            }
    });

    return usage;
};

export async function getDaysUntilStockout(){

    const [stock, usage] = await Promise.all([getStockLevels(), getLastMonthStockUsage()])
   

    const forcast = stock.map((item)=>{
        const issuedLast30 = usage.find((u) => u.stockId)?._sum.quantity ?? 0;

        const avgDailyUsage = issuedLast30 / 30;

        const daysRemaining = avgDailyUsage === 0 ? null : item.quantity / avgDailyUsage
            return {
      stockId: item.id,
      name: item.name,
      days: daysRemaining
        ? Math.floor(daysRemaining)
        : null,
    }

    });
    

    return forcast.filter((i) => i.days !== null && i.days)
  .sort((a, b) => a.days! - b.days!)
  .slice(0, 5)
};


export async function getCostCentreChartData(){
    const userId = await getUserId();

  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear();

  const spend = await prisma.costLedger.groupBy({
    by:['costCentreName',],
    where:{
        userId,
        month,
        year,
        sourceType:"REQUEST"
    },
    _sum:{
        totalCost: true
    },
    orderBy:{
        _sum:{
            totalCost:"desc"
        }
    },
    
    take: 5
  });

      const serialised = spend.map((item) => ({
        ...item,
        _sum: item._sum.totalCost?.toNumber() ?? 0,
  
    }));

  return serialised;

};

export async function getTopSpendingCostCentres(){
    const userId = await getUserId();

    

    

    const costCentres = await prisma.costCentre.findMany({
        where:{
            userId,
    
        },
        select:{
            id: true,
            name: true,
            code:true,
      
            _count:{
                select:{
                    requests:true
                }
            },
                ledger: {
                select: {
                    totalCost: true
                }
            },
            requests:{
                select:{
                    customer:true,
                    quantity:true
                }
            }
        },
        take: 10,
        orderBy:{
          ledger:{
            _count:"desc"
          }
        }
   

      
    });

        const serialisedFinances = costCentres.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        highestCustomer: item.requests.sort((a, b) => b.quantity - a.quantity)[0].customer,

        totalCost: item.ledger.reduce(
            (sum, entry) => sum + entry.totalCost.toNumber(),
            0
        ),

        requestCount: item._count.requests,
    }));

    return serialisedFinances
    .sort((a, b) => b.totalCost - a.totalCost);
}