"use server";


import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { aisleLocation, demoCostCentres, demoCustomers, demoStock, demoVendors, generatePartNumber, pickRandom, randomDateWithin, randomInt, weightedStatus } from "../helpers";
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

    const userId = await getUserId()

    try {

        await prisma.costCentre.createMany({
            data: demoCostCentres.map((cc, i) => ({
                code: "CC" + (100 + i),
                name: cc,
                userId,
            }))
        });



        // Load vendors

        await prisma.vendor.createMany({
            data: demoVendors.map((vendor, i) => ({
                name: vendor,
                email: `${vendor.toLowerCase().replace(/\s/g, "")}@demo.co.nz`,
                contactName: "Accounts Team",
                userId,
                PONumber: 20000 + i
            }))
        });

        const vendors = await prisma.vendor.findMany({
            where: { userId },
        });


        // Load stock

        await prisma.stock.createMany({
            data: demoStock.map((stock) => ({
                name: stock.name,
                brand: stock.brand,
                partNumber: generatePartNumber(),
                reorderPoint: 20,
                location: pickRandom(aisleLocation),
                vendorId: pickRandom(vendors).id,
                userId,
                unitCost: randomInt(20, 150),
                quantity: randomInt(5, 60),

            }))
        })












    } catch (error) {
        console.log(error);

    }
};


export async function createRequests() {
    const userId = await getUserId();
    const stockItems = await prisma.stock.findMany({ where: { userId } });
    const costCentres = await prisma.costCentre.findMany({ where: { userId } });

    const requestData = [];



    for (let i = 0; i < 100; i++) {

        const stock = pickRandom(stockItems);
        const costCentre = pickRandom(costCentres);



        requestData.push({
            customer: pickRandom(demoCustomers),
            requestNumber: 5000 + i,
            quantity: randomInt(1, 5),
            status: weightedStatus() as RequestStatus,
            stockId: stock.id,
            costCentreId: costCentre.id,
            userId,
            createdAt: randomDateWithin(90),
        });

    };

    await prisma.request.createMany({
        data: requestData
    });

    const requestsArray = await prisma.request.findMany({
        where: { userId, requestNumber: { gte: 5000, lte: 5100 }, },
    });

    for (const request of requestsArray) {

        const created = request.createdAt.getTime();
        const now = Date.now();
        const randomFutureDate = new Date(randomInt(created, now));
        let finalStatus = request.status;

        if (finalStatus !== "OPEN") {

            const stockUpdate = await prisma.stock.updateMany({
                where: {
                    id: request.stockId,
                    quantity: { gte: request.quantity },

                },
                data: {
                    quantity: { decrement: request.quantity }
                }
            });

            if (stockUpdate.count === 0) {
                finalStatus = "OPEN"
            }

        };

        const completedAt = finalStatus === "COMPLETE" ? randomFutureDate : null;

        await prisma.request.update({ where: { userId, id: request.id }, data: { completedAt, status: finalStatus } });

        const ledgerDate = finalStatus === "COMPLETE" ? randomFutureDate : request.createdAt;

        const stock = await prisma.stock.findUnique({
            where: { id: request.stockId }
        });
        const costCentre = await prisma.costCentre.findUnique({
            where: { id: request.costCentreId },
        });
        await prisma.costLedger.create({
            data: {
                sourceType: "REQUEST",
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
                userId

            }
        });


    }

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

        for (let i = 0; i < 20; i++) {
            const stock = pickRandom(stockItems);
            const vendor = pickRandom(vendors);
            const qty = randomInt(5, 25)
            const purchaseDate = randomDateWithin(180);

            purchaseData.push({
                purchaseNumber: 1000 + i,
                status: pickRandom(["PLACED", "RECEIVED"]) as PurchaseStatus,
                quantity: qty,
                totalCost: qty * Number(stock.unitCost),
                stockId: stock.id,
                vendorId: vendor.id,
                userId,
                createdAt: purchaseDate
            });

        };

        await prisma.purchase.createMany({
            data: purchaseData
        });

        const purchaseArray = await prisma.purchase.findMany({
            where: { userId }
        });

        for (const purchase of purchaseArray) {

            if (purchase.status !== "RECEIVED") continue;
            await prisma.stock.update({
                where: { id: purchase.stockId, userId },
                data: { quantity: { increment: purchase.quantity } }
            });

            const stock = await prisma.stock.findUnique({
                where: { id: purchase.stockId },
            });

            const vendor = await prisma.vendor.findUnique({
                where: { id: purchase.vendorId },
            });



            await prisma.costLedger.create({
                data: {
                    sourceType: "PURCHASE",
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
                }
            })

        }







    } catch (error) {
        console.log(error);

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
        })


        return { success: true, message: "Data deleted" }
    } catch (error) {
        console.log(error);


        return { success: false, message: "Delete failed" }


    }


}