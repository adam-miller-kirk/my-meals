import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function ShoppingPage() {
    // making a small excess call to redirect the user to the correct place
    const latest = await db.shoppingList.findFirst({ orderBy: { createdAt: "desc" } });
    redirect(`/shopping/${latest ? latest.id : "new"}`);
}
