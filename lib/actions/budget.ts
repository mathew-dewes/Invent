"use server";

import z from "zod";
import prisma from "../prisma";
import { budgetSchema } from "../schemas";
import { getUserId } from "./auth";
import { revalidatePath } from "next/cache";


export async function upsertBudget(values: z.infer<typeof budgetSchema>) {
    const userId = await getUserId();

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();



    try {

        const parsed = budgetSchema.safeParse(values);

        if (!parsed.success) {
            console.error('Validation errors:', parsed.error);
            throw new Error('Validation failed');
        };

        const { budget } = parsed.data

        await prisma.budget.upsert({
            where: {
                userId_month_year:
                    { userId, month: currentMonth, year: currentYear }
            },
            update: {
                amount: budget,

            },
            create: {
                amount: budget,
                month: currentMonth,
                year: currentYear,
                userId
            }
        });

        revalidatePath('/finance/budget')

        return {
            success: true, message: "Budget was updated"
        }


    } catch (error) {
        console.error(error);

        return {
            success: false, message: "Budget could not update"
        }
    }


};
