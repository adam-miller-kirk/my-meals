import { db } from "@/db";
import Link from "next/link";

import IngredientToggle from "@/components/ingredientToggle";

export default async function CurrentShoppingListPage() {
    const shoppingList = await db.shoppingList.findFirst({
        orderBy: { createdAt: "desc" },
        include: { shoppingItems: true }
    });

    const shoppingItems = shoppingList?.shoppingItems || [];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Ingredients Page</h1>
                <div>
                    { shoppingList?.id && (
                        <Link href={`/shopping/${shoppingList.id}/edit`} className="border p-2 rounded mr-2">
                            Edit
                        </Link>
                    ) }
                    <Link href="/shopping/new" className="border p-2 rounded">
                        New
                    </Link>
                </div>
            </div>

            <div className="border p-2 rounded shadow flex gap-2 flex-wrap">
                { shoppingItems.length > 0 ?
                    shoppingItems.map((item, index) => (
                        <IngredientToggle
                            key={`${item.name}-${index}`}
                            label={item.name}
                        />
                    )) : (
                        <p>Create your first shopping list</p>
                    )
                }
            </div>
        </div>
    );
}
