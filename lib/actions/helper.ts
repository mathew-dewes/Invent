"use server";

import prisma from "../prisma";

export async function generateRequestNumber(userId: string): Promise<number> {
    let unique = false;
    let requestNumber = 0;

    while (!unique) {
        requestNumber = Math.floor(Math.random() * 9999) + 1

        const existing = await prisma.request.findUnique({
            where: { userId_requestNumber:{userId, requestNumber}}
        });

        if (!existing) unique = true;


    }


    return requestNumber
};