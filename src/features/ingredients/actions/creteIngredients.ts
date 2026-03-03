"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createIngredient(_: { message: string }, formData: FormData) {
    try {
        const name = formData.get("name");
        const description = formData.get("description");

        if (typeof name !== "string" || name.length < 3) {
            return {
                message: "Name must be longer",
            };
        }

        if (typeof description !== "string") {
            return {
                message: "Description needs to be a string",
            };
        }

        await db.ingredient.create({
            data: {
                name,
                description,
                recipeId: null,
                instructionId: null,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
            };
        } else {
            return {
                message: "Something went wrong.",
            };
        }
    }
    revalidatePath("/ingredients"); // data change so get new cache version
    redirect("/ingredients");
}
