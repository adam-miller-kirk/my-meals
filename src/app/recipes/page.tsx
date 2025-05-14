import { db } from "@/db";
import Link from "next/link";

export default async function RecipesPage() {
  const recipes = await db.recipe.findMany();

  const renderedRecipes = recipes.map((recipe, index) => {
    return (
      <Link
        key={`${recipe.name} ${index}`}
        className="flex justify-between items-center p-2 border rounded"
        href={`/recipes/${recipe.id}`}
      >
        <h1>{recipe.name}</h1>
        <p>View</p>
      </Link>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Recipes Page</h1>
        <Link href="/recipes/new" className="border p-2 rounded">
          New
        </Link>
      </div>

      {renderedRecipes}
    </div>
  );
}
