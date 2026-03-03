"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteRecipe(id: string) {
    await db.recipe.delete({
        where: { id },
    });

    revalidatePath("/recipes"); // data change so get new cache version
    redirect("/recipes");
}
