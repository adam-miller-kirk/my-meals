"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteIngredient(id: string) {
    await db.ingredient.delete({
        where: { id },
    });
    revalidatePath("/ingredients"); // data change so get new cache version
    redirect("/ingredients");
}
