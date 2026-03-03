import { db } from "@/db";
import { editShoppingList } from "@/features/shoppingList/actions/editShoppingList";
import { ShoppingItemBaseProps } from "@/features/shoppingList/model/types";
import ShoppingListForm from "@/features/shoppingList/components/shoppingListForm";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const shoppingList = await db.shoppingList.findUnique({
        where: { id },
        include: { shoppingItems: true },
    });

    if (!shoppingList) {
        redirect("/shopping/new");
    }

    const initialItems: ShoppingItemBaseProps[] = shoppingList.shoppingItems.map((item) => ({
        name: item.name,
        group: item.group,
    }));

    return (
        <ShoppingListForm
            initialItems={initialItems}
            action={editShoppingList}
            submitLabel="Update"
            id={id}
        />
    );
}
