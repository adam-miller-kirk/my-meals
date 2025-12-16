import { db } from "@/db";
import Link from "next/link";
import { deleteIngredient } from "@/actions";

export default async function IngredientsPage() {
    const ingredients = await db.ingredient.findMany();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Ingredients Page</h1>
                <Link href="/ingredients/new" className="border p-2 rounded">
                    New
                </Link>
            </div>

            <div className="border p-2 rounded shadow flex flex-col gap-1">
                {ingredients.length > 0 ? (
                    ingredients.map((ingredient, index) => (
                        <div
                            key={`${ingredient.name} ${index}`}
                            className="border p-2 rounded shadow grid grid-cols-[1fr_auto_auto] gap-2 items-center"
                        >
                            <div className="p-2 grid grid-cols-[1fr_1fr_auto] gap-2 items-center w-full">
                                <p className="border rounded p-1">{ingredient.name}</p>
                                <p className="border rounded p-1">{ingredient.description}</p>
                                <p className="border rounded p-1">{ingredient.weight}</p>
                            </div>
                            <Link
                                key={`${ingredient.name} ${index}`}
                                className="flex  items-center justify-center p-2 border rounded w-20 bg-blue-200"
                                href={`/ingredients/${ingredient.id}`}
                            >
                                View
                            </Link>
                            <form action={deleteIngredient.bind(null, ingredient.id)}>
                                <button className="p-2 border rounded w-20 bg-red-200 cursor-pointer">
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))
                ) : (
                    <p>No ingredients</p>
                )}
            </div>
        </div>
    );
}
