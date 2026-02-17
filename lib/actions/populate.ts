"use server";


import { FinanceType, PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { aisleLocation, demoCostCentres, demoCustomers, demoStock, demoVendors, generatePartNumber, pickRandom, randomDateBetween, randomDateWithin, randomInt, weightedPurchaseStatus, weightedRequestStatus } from "../helpers";
import prisma from "../prisma";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";


export async function LoadDemoData() {


    try {


        await createBaseTables();
        await createRequests();
        await createPurchases();


        revalidatePath('/dashboard');

        return { success: true, message: "Data update successful" }


    } catch (error) {
        console.log(error);
        return { success: false, message: "There was an error" }
    }

}



export async function createBaseTables() {

    const userId = await getUserId();

    try {

        return prisma.$transaction(async (tx) => {

            await tx.costCentre.createMany({
                data: demoCostCentres.map((cc, i) => ({
                    code: "CC" + (100 + i),
                    name: cc,
                    userId,
                }))
            });
            await tx.vendor.createMany({
                data: demoVendors.map((vendor, i) => ({
                    name: vendor,
                    email: `${vendor.toLowerCase().replace(/\s/g, "")}@demo.co.nz`,
                    contactName: "Accounts Team",
                    userId,
                    PONumber: 20000 + i
                }))
            });

            const vendors = await tx.vendor.findMany({
                where: { userId },
            });

            await tx.stock.createMany({
                data: demoStock.map((stock) => ({
                    name: stock.name,
                    brand: stock.brand,
                    partNumber: generatePartNumber(),
                    reorderPoint: 20,
                    location: pickRandom(aisleLocation),
                    vendorId: pickRandom(vendors).id,
                    userId,
                    unitCost: randomInt(20, 150),
                    quantity: randomInt(10, 30),

                }))
            })

        })




    } catch (error) {
        console.log(error);

    }
};


export async function createRequests() {
    const userId = await getUserId();


    const stockItems = await prisma.stock.findMany(
        {
            where: { userId },
            select: {
                id: true,
                name: true,
                unitCost: true,
                vendor: {
                    select: {
                        name: true
                    }
                }
            }
        });

    const costCentres = await prisma.costCentre.findMany(
        { where: { userId } });

    const requestData = [];



    for (let i = 0; i < 50; i++) {

        const stock = pickRandom(stockItems);
        const costCentre = pickRandom(costCentres);

        const status = weightedRequestStatus() as RequestStatus;

        const createdAtDate = () =>{
            if (status == "COMPLETE"){
                return randomDateBetween(3,60)
            } else if (status == "PENDING"){
                return randomDateWithin(1)
            } else if (status == "READY") {
                return randomDateWithin(2)
            }
        }



        requestData.push({
            customer: pickRandom(demoCustomers),
            requestNumber: 5000 + i,
            quantity: randomInt(1, 5),
            status,
            stockId: stock.id,
            costCentreId: costCentre.id,
            userId,
            createdAt: createdAtDate(),

        });

    };

    await prisma.request.createMany({
        data: requestData,
        skipDuplicates: true
    });

    const requests = await prisma.request.findMany({
        where: { userId, requestNumber: { gte: 5000, lte: 5100 }, },
    });



    const stockMap = new Map(stockItems.map((s) => [s.id, s]));
    const costCentreMap = new Map(costCentres.map((c) => [c.id, c]));
    const requestUpdates = [];
    const ledgerRows = [];

    const decrements = new Map<string, number>();

    for (const request of requests) {

        const created = request.createdAt.getTime();
        const now = Date.now();
        const randomFutureDate = new Date(randomInt(created, now));

        const finalStatus = request.status;

        if (finalStatus !== "PENDING") {

            decrements.set(
                request.stockId,
                (decrements.get(request.stockId) ?? 0) + request.quantity
            );

        };

        const completedAt = finalStatus === "COMPLETE" ? randomFutureDate : null;

        requestUpdates.push(
            prisma.request.update({
                where: { id: request.id },
                data: { completedAt, status: finalStatus },
            })
        );

        const ledgerDate = finalStatus === "COMPLETE" ? randomFutureDate : request.createdAt;
        const stock = stockMap.get(request.stockId);
        const costCentre = costCentreMap.get(request.costCentreId);

        ledgerRows.push({
            sourceType: "REQUEST" as FinanceType,
            sourceId: request.id,
            reference: `REQ-${request.requestNumber}`,

            stockId: request.stockId,
            stockName: stock?.name ?? "Unknown",

            costCentreId: request.costCentreId,
            costCentreName: costCentre?.name ?? "Unknown",

            quantity: request.quantity,
            unitCost: stock?.unitCost ?? 0,
            totalCost: request.quantity * Number(stock?.unitCost ?? 0),

            month: ledgerDate.getMonth() + 1,
            year: ledgerDate.getFullYear(),
            createdAt: ledgerDate,

            userId,
            vendorName: stock?.vendor.name ?? "Unknown",
            customerName: request.customer,
        });


    }

    await prisma.$transaction(
        Array.from(decrements.entries()).map(([stockId, qty]) =>
            prisma.stock.update({
                where: { id: stockId },
                data: { quantity: { decrement: qty } }
            })
        )
    );

    await prisma.$transaction(requestUpdates);


    await prisma.costLedger.createMany({
        data: ledgerRows,
        skipDuplicates: true
    });

    return { success: true, message: "Requests added" };













};




export async function createPurchases() {
    const userId = await getUserId();
    const vendors = await prisma.vendor.findMany({
        where: { userId },
    });

    const stockItems = await prisma.stock.findMany({
        where: { userId },
    });

    const purchaseData = [];


    try {
        const placedStockIds = new Set<string>();


        for (let i = 0; i < 20; i++) {

            const stock = pickRandom(stockItems);
            const vendor = pickRandom(vendors);
            const qty = randomInt(5, 10)
            const purchaseDate = randomDateBetween(3, 90);
            const status = weightedPurchaseStatus() as PurchaseStatus;

            if (status === "PLACED") {
                if (placedStockIds.has(stock.id)) {
                    continue; 
                }

                placedStockIds.add(stock.id);
            }


            purchaseData.push({
                purchaseNumber: 1000 + i,
                status,
                quantity: qty,
                totalCost: qty * Number(stock.unitCost),
                stockId: stock.id,
                vendorId: vendor.id,
                userId,
                createdAt: purchaseDate
            });

        };

        await prisma.purchase.createMany({
            data: purchaseData,
            skipDuplicates:true,
        });

        const receivedPurchases = await prisma.purchase.findMany({
            where: { userId, status: "RECEIVED" }
        });

        const stockMap = new Map(stockItems.map((s) => [s.id, s]));
        const vendorMap = new Map(vendors.map((s) => [s.id, s]));
          const ledgerRows = [];

        for (const purchase of receivedPurchases) {

            await prisma.stock.update({
                where: { id: purchase.stockId },
                data: { quantity: { increment: purchase.quantity } }
            });

                const stock = stockMap.get(purchase.stockId);
                const vendor = vendorMap.get(purchase.vendorId);

                ledgerRows.push({
                    sourceType: "PURCHASE" as FinanceType,
                    sourceId: purchase.id,
                    reference: `PUR-${purchase.purchaseNumber}`,
                    stockId: purchase.stockId,
                    stockName: stock?.name ?? "Unknown",
                    vendorId: purchase.vendorId,
                    vendorName: vendor?.name ?? "Unknown",
                    quantity: purchase.quantity,
                    unitCost: stock?.unitCost ?? 0,
                    totalCost: purchase.quantity * Number(stock?.unitCost ?? 0),
                    month: purchase.createdAt.getMonth() + 1,
                    year: purchase.createdAt.getFullYear(),
                    createdAt: purchase.createdAt,
                    userId
                })


        }

       await prisma.costLedger.createMany({
        data: ledgerRows,
        skipDuplicates: true
       })







    } catch (error) {
        console.log("❌ createPurchases failed:", error);

    }
}

export async function clearDemoData() {
    const userId = await getUserId();

    try {

        await prisma.costLedger.deleteMany({
            where: { userId }
        })

        await prisma.purchase.deleteMany({
            where: { userId }
        })

        await prisma.request.deleteMany({
            where: { userId }
        })

        await prisma.stock.deleteMany({
            where: { userId }
        });
        await prisma.costCentre.deleteMany({
            where: { userId },

        })
        await prisma.vendor.deleteMany({
            where: { userId }
        });

        revalidatePath('/dashboard');


        return { success: true, message: "Data deleted" }
    } catch (error) {
        console.log(error);


        return { success: false, message: "Delete failed" }


    }


};

export async function hasData() {
    const userId = await getUserId();

    const requests = await prisma.request.count({
        where: { userId }
    });

    const purchases = await prisma.purchase.count({
        where: { userId }
    });
    const centres = await prisma.costCentre.count({
        where: { userId }
    });

    const vendors = await prisma.vendor.count({
        where: { userId }
    });

    const stock = await prisma.stock.count({
        where: { userId }
    });

    const ledger = await prisma.costLedger.count({
        where: { userId }
    });

    if (requests == 0 && ledger == 0 && stock == 0 && vendors == 0 && centres == 0 && purchases == 0) {
        return false

    } else {
        return true
    }


}