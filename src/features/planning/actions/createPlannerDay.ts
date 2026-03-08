"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { startOfDay, startOfWeek } from "../model/utils";
import { Prisma } from "@/generated/prisma";

export async function createPlannerDay({
    date,
    type = "RECIPE",
    notes,
    recipeId,
}: {
    date: Date;
    type?: "RECIPE" | "TAKEAWAY" | "OTHER";
    notes?: string;
    recipeId?: string;
}) {
    try {
        // Normalize to start-of-day so the unique `date` constraint effectively enforces
        // "one planner entry per calendar day".
        const normalizedDate = startOfDay(date);
        const weekStart = startOfWeek(date);
        const year = normalizedDate.getFullYear();

        await db.plannerDay.create({
            data: {
                date: normalizedDate,
                type,
                notes,
                ...(recipeId && { recipe: { connect: { id: recipeId } } }),
                plannerWeek: {
                connectOrCreate: {
                    where: { startDate: weekStart },
                    create: {
                    startDate: weekStart,
                    plannerYear: {
                        connectOrCreate: {
                        where: { year },
                        create: { year },
                        },
                    },
                    },
                },
                },
            },
        });
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return { message: "Planner day already exists for this date." };
            }
        }
        if (err instanceof Error) return { message: err.message };
        return { message: "Could not create PlannerDay." };
    }

    revalidatePath("/planning");
    redirect("/planning");
}