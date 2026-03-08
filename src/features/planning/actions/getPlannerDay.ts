"use server";

import { db } from "@/db";
import { startOfDay, endOfDay, startOfWeek } from "../model/utils";

export async function getPlannerDay(date: Date) {
    const plannerDay = await db.plannerDay.findFirst({
        where: {
            date: {
                gte: startOfDay(date),
                lte: endOfDay(date),
            },
        },
        include: {
            recipe: true,
            plannerWeek: { include: { plannerYear: true } },
        },
    });

    return plannerDay;
}

export async function getPlannerWeek(date: Date) {
    const weekStart = startOfWeek(date);

    const plannerWeek = await db.plannerWeek.findFirst({
        where: { startDate: weekStart },
        include: {
            plannerDays: {
                include: { recipe: true },
            },
            plannerYear: true,
        },
    });

    return plannerWeek;
}