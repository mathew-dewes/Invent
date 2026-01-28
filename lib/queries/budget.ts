"use server";

import { Prisma } from "@/generated/prisma/client";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";


export async function getBudgetAmount() {
    const userId = await getUserId();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const total = await prisma.budget.findUnique({
        where: { userId_month_year: { userId, month: currentMonth, year: currentYear } }
    });

    return total?.amount;



};

export async function getMonthlyTotalSpend() {
    const userId = await getUserId();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

   const spend = await prisma.costLedger.aggregate({
    where:{type:"PURCHASE", month: currentMonth, year: currentYear, userId},
    _sum:{
        totalCost: true
    }
   });

   return spend._sum.totalCost;
};

function toNZISOString(date: Date) {
  const d = new Date(date);
  // get NZ local year/month/day
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; 
}


type ChartPoint = {
  date: string;
  spend: number;
};

export async function getBudgetChartData(){
    const userId = await getUserId();



    const purchases = await prisma.costLedger.findMany({
        where:{userId, type:"PURCHASE"},
        select:{
            createdAt:true,
            totalCost:true
        }
    });

    const map = new Map<string, Prisma.Decimal>();

    for (const p of purchases){
        const dateKey = toNZISOString(p.createdAt);
        const existing = map.get(dateKey) ?? new Prisma.Decimal(0);
        map.set(dateKey, existing.plus(p.totalCost));
    }

    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();

    const result: ChartPoint[] = [];
    const current = new Date(start);

    while (current <= end){
        const key = toNZISOString(current);

        result.push({
            date: key,
            spend: map.get(key)?.toNumber() ?? 0
        });

        current.setDate(current.getDate() + 1)
    };

    return result;



   
}