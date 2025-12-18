"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createRecipe(_: { message: string }, formData: FormData) {
    try {
        // Check the user's input and make sure they are valid
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

        await db.recipe.create({
            data: {
                name,
                description,
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

    revalidatePath("/recipes"); // data change so get new cache version
    redirect("/recipes"); // NOTE redirect acts weird with try and catch so moved here
}

export async function editRecipe(id: string, formData: FormData) {
    // Check the user's input and make sure they are valid
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await db.recipe.update({
        where: { id },
        data: {
            name,
            description,
        },
    });

    revalidatePath(`/recipes/${id}`); // data change so get new cache version
    redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string) {
    await db.recipe.delete({
        where: { id },
    });

    revalidatePath("/recipes"); // data change so get new cache version
    redirect("/recipes");
}

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

export async function editIngredient(id: string, formData: FormData) {
    // Check the user's input and make sure they are valid
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    // const weight = formData.get("weight") as string;

    await db.ingredient.update({
        where: { id },
        data: {
            name,
            description
        },
    });
    revalidatePath(`/ingredients/${id}`); // data change so get new cache version
    redirect(`/ingredients/${id}`);
}

export async function deleteIngredient(id: string) {
    await db.ingredient.delete({
        where: { id },
    });
    revalidatePath("/ingredients"); // data change so get new cache version
    redirect("/ingredients");
}
