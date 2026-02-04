"use server";

import prisma from "../prisma";

export async function generateRequestNumber(): Promise<number> {
    let unique = false;
    let requestNumber = 0;

    while (!unique) {
        requestNumber = Math.floor(Math.random() * 99999) + 1

        const existing = await prisma.request.findUnique({
            where: { requestNumber }
        });

        if (!existing) unique = true;


    }


    return requestNumber
};