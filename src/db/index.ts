import { PrismaClient } from "@prisma/client/extension";

export const db = new PrismaClient();

db.recipe.create({
  data: {
    name: "My Student Meal",
    description: "A taste meal of air",
    ingredients: [],
    instructions: [],
    plannerDays: [],
  },
});
