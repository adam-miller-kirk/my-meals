import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteIngredient } from "@/actions";

interface IngredientPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function IngredientPage(props: IngredientPageProps) {
    const { id } = await props.params;

    const ingredient = await db.ingredient.findFirst({
        where: { id },
    });

    if (!ingredient) {
        return notFound();
    }

    const deleteIngredientAction = deleteIngredient.bind(null, ingredient.id);

    return (
        <div className="flex flex-col">
            <div className="flex mb-4 justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Link className="p-2 border rounded" href={`/ingredients`}>
                        Back
                    </Link>
                    <h1 className="text-xl font-bold">{ingredient.name}</h1>
                </div>

                <div className="flex gap-4">
                    <Link
                        className="p-2 border rounded"
                        href={`/ingredients/${ingredient.id}/edit`}
                    >
                        Edit
                    </Link>
                    <form action={deleteIngredientAction}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>

            <p>{ingredient.description}</p>
        </div>
    );
}

export async function generateStaticParams() {
    const ingredients = await db.ingredient.findMany();

    return ingredients.map((ingredient) => {
        return {
            id: ingredient.id,
        };
    });
}
