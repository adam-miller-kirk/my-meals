"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseShoppingItems } from "../model/utils";

export async function createShoppingList(_: { message: string }, formData: FormData) {
    try {
        const itemsResult = parseShoppingItems(formData);
        if (!itemsResult.success) return { message: itemsResult.error };

        await db.shoppingList.create({
            data: {
                shoppingItems: {
                    create: itemsResult.shoppingItems.map((item) => ({
                        name: item.name,
                        group: item.group,
                        // checked defaults to false automatically
                    })),
                },
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) return { message: err.message };
        return { message: "Could not create shopping list." };
    }

    revalidatePath("/shopping");
    redirect("/shopping");
}
