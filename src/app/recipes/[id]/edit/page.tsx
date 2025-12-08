import { notFound } from "next/navigation";
import { db } from "@/db";
import RecipeEditForm from "@/components/recipe-edit-form";

interface RecipeEditProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function RecipeEditPage(props: RecipeEditProps) {
    const { id } = await props.params;

    const recipe = await db.recipe.findFirst({
        where: { id },
    });

    if (!recipe) {
        return notFound();
    }

    return <RecipeEditForm recipe={recipe} />;
}
