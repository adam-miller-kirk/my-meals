import { PrismaClient } from "@/generated/prisma";

export const db = new PrismaClient();

db.recipe.create({
    data: {
        name: "My Student Meal",
        description: "A tastey meal of air",
    },
});
