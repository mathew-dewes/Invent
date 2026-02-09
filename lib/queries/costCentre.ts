"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getCostCentres() {
    const userId = await getUserId();

    const centres = await prisma.costCentre.findMany({
        where: { userId },
        select: {
            code: true,
            name: true,
            createdAt: true,
            id: true,
            ledger: {
                select: {
                    totalCost: true
                }
            },
            _count: {
                select: {
                    requests: true
                }
            }


        },

    });

    const serialisedFinances = centres.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        createdAt: item.createdAt,

        totalCost: item.ledger.reduce(
            (sum, entry) => sum + entry.totalCost.toNumber(),
            0
        ),

        requestsCount: item._count.requests,
    }));

    return serialisedFinances
}