import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteRecipe } from "@/actions";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipePage(props: RecipePageProps) {
  const { id } = await props.params;

  const recipe = await db.recipe.findFirst({
    where: { id },
  });

  if (!recipe) {
    return notFound();
  }

  const deleteRecipeAction = deleteRecipe.bind(null, recipe.id);

  return (
    <div className="flex flex-col">
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{recipe.name}</h1>
        <div className="flex gap-4">
          <Link
            className="p-2 border rounded"
            href={`/recipes/${recipe.id}/edit`}
          >
            Edit
          </Link>
          <form action={deleteRecipeAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>

      <p>{recipe.description}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const recipes = await db.recipe.findMany();

  return recipes.map((recipe) => {
    return {
      id: recipe.id,
    };
  });
}
