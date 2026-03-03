"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
