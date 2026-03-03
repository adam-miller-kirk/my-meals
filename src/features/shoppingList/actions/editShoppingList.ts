"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseShoppingItems, parseShoppingListId } from "../model/utils";

export async function editShoppingList(
    _: { message: string },
    formData: FormData,
): Promise<{ message: string }> {
    try {
        const idResult = parseShoppingListId(formData);
        if (!idResult.success)
            return { message: String(idResult.error || "Missing shopping list ID.") };

        const itemsResult = parseShoppingItems(formData);
        if (!itemsResult.success) return { message: itemsResult.error };

        await db.shoppingList.update({
            where: { id: idResult.id },
            data: {
                shoppingItems: {
                    deleteMany: {},
                    create: itemsResult.shoppingItems,
                },
            },
        });
    } catch (err) {
        if (err instanceof Error) return { message: err.message };
        return { message: "Could not update shopping list." };
    }

    revalidatePath("/shopping");
    redirect("/shopping");
}
