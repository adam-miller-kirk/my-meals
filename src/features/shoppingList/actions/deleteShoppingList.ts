"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteShoppingList(id: string) {
    if (!id) {
        throw new Error("Missing shopping list ID.");
    }

    await db.shoppingList.delete({
        where: { id },
    });

    revalidatePath("/shopping");
    redirect("/shopping");
}
