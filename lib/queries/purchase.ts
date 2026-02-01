"use server";

import { PurchaseStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getNZDateKey } from "../helpers";



export async function getPurchases(filter?: PurchaseStatus) {
    const userId = await getUserId();

    const purchases = await prisma.purchase.findMany({
        where: { userId },
        orderBy:
            { createdAt: "desc" },
        select: {
            id: true,
            createdAt: true,
            purchaseNumber: true,

            quantity: true,
            PO: true,
            totalCost: true,
            status: true,
            stockItem: {
                select: {
                    name: true,
                    quantity: true,
                    id: true,
                    vendor: {
                        select: {
                            name: true
                        }
                    }
                }
            }

        }
    });

    const serialisedPurchases = purchases.map(item => ({
        ...item,
        totalCost: item.totalCost.toString(), // safest for money
    }));


    const placedPurchases = serialisedPurchases.filter(
        item => item.status === "PLACED"
    );
    const delayedPurchases = serialisedPurchases.filter(
        item => item.status === "DELAYED"
    );
    const receivedPurchases = serialisedPurchases.filter(
        item => item.status === "RECEIVED"
    );


    if (filter === "PLACED") {
        return placedPurchases;
    } else if (filter === "DELAYED") {
        return delayedPurchases;
    } else if (filter === "RECEIVED") {
        return receivedPurchases;
    } else {

        return serialisedPurchases;
    }

}

export async function getPurchaseById(id: string) {
    const userId = await getUserId();

    const purchase = await prisma.purchase.findUnique({
        where: { userId, id },
        select: {
            id: true,
            createdAt: true,
            purchaseNumber: true,
            notes: true,
            quantity: true,
            PO: true,
            totalCost: true,
            status: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true
                }
            }

        }
    });

    return purchase
}


export async function getPurchaseStatusCount() {
    const userId = await getUserId();

    const requests = await prisma.purchase.findMany({
        select: {
            status: true
        },
        where: { userId }
    });


    const queryCounts = {
        PLACED: requests.filter(q => q.status === "PLACED").length,
        DELAYED: requests.filter(q => q.status === "DELAYED").length,
        RECEIVED: requests.filter(q => q.status === "RECEIVED").length,

    }

    return queryCounts

}

export async function getPuchaseCardData() {
    const userId = await getUserId();
    const request = await prisma.purchase.findMany({
        where: { userId },
        select: {
            status: true,
            quantity: true,
            stockItem: {
                select: {
                    name: true,
                    vendor: {
                        select: {
                            name: true
                        }
                    }

                }
            }
        }
    });

    return request;
}



export async function getDelayedPurchases() {
    const userId = await getUserId();
    const purchases = await prisma.purchase.findMany({
        where: { userId, status: "DELAYED" },
        select: {
            stockItem: {
                select: {
                    name: true,
                    quantity: true,
                }
            },
            vendor: {
                select: {
                    name: true
                }
            }
        }
    });

    return purchases;
}



export async function getPurchaseChartData() {
    const userId = await getUserId();

       const start = new Date();
    start.setDate(start.getDate() - 13);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const purchases = await prisma.purchase.findMany({
        where: { userId, status: { not: "DELAYED"},
    createdAt:{
        gte: start, lte: end
    } },
        select: {
            createdAt: true,
            status: true
        }
    });

    const map = new Map<string, { date: string; received: number, placed: number }>();

    for (const purchase of purchases) {
        const dateKey = getNZDateKey(purchase.createdAt);
        const existing = map.get(dateKey) ?? {
            date: dateKey,
            received: 0,
            placed: 0
        };

        if (purchase.status === "RECEIVED") {
            existing.received += 1;
        };
            existing.placed += 1;

        map.set(dateKey, existing);
    }



    const result: { date: string; received: number; placed: number }[] = [];
    const current = new Date(start);

    while (getNZDateKey(current) <= getNZDateKey(end)) {

        const key = getNZDateKey(current);

        result.push(
            map.get(key) ?? {
                date: key,
                received: 0,
                placed: 0
            }
        );
        current.setDate(current.getDate() + 1);
    };

    return result;

};


export async function getPurchaseTableData(){
    const userId = await getUserId();

    const data = await prisma.purchase.findMany({
        where:{userId},
        select:{
            id:true,
            createdAt:true,
            vendor:{
                select:{
                    name:true
                }
            },
            stockItem:{
                select:{
                    name:true
                }
            },
            quantity: true,
            status:true
        },
        take: 10,
        orderBy:{
            createdAt:"desc"
        }
    });

    return data;
}

