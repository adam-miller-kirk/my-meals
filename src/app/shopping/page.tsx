import { db } from "@/db";
import Link from "next/link";

import IngredientToggle from "@/components/ingredientToggle";

export default async function CurrentShoppingListPage() {
    const shoppingList = await db.shoppingList.findFirst({ orderBy:  { createdAt: "desc" }});

    const ingredients = shoppingList?.ingredients || [];

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
                { ingredients.length > 0 ?
                    ingredients.map((ingredient, index) => (
                        <IngredientToggle
                            key={`${ingredient}-${index}`}
                            label={ingredient}
                        />
                    )) : (
                        <p>No ingredients</p>
                    )
                }
            </div>
        </div>
    );
}
