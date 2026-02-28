import { db } from "@/db";

export default async function ShoppingListPage({ params }: {  params: Promise<{ id: string }>}) {
    const { id } = await params;
    const shoppingList = await db.shoppingList.findUnique({ where: { id } });
    const ingredients = shoppingList?.ingredients || [];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Shopping List</h1>
            </div>

            <div className="border p-2 rounded shadow flex gap-2 flex-wrap">
            {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                <div
                    key={`${ingredient}-${index}`}
                    className="flex gap-2 items-center my-1 bg-blue-200 py-2 px-4 rounded"
                >
                    {ingredient}
                </div>
                ))
            ) : (
                <p>No ingredients</p>
            )}
            </div>
        </div>
    );
}
