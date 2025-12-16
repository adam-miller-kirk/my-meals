import { notFound } from "next/navigation";
import { db } from "@/db";
// import IngredientEditForm from "@/components/ingredient-edit-form";

interface IngredientEditProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function IngredientEditPage(props: IngredientEditProps) {
    const { id } = await props.params;

    const ingredient = await db.ingredient.findFirst({
        where: { id },
    });

    if (!ingredient) {
        return notFound();
    }

    // return <IngredientEditForm ingredient={ingredient} />;
    return <p>Ingredient Edit Form</p>;
}
