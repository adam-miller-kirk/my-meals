"use client";

import type { Recipe } from "@/generated/prisma";
import { editRecipe } from "@/actions";
import { startTransition } from "react";

interface RecipeEditFormProps {
    recipe: Recipe;
}

export default function RecipeEditForm({ recipe }: RecipeEditFormProps) {
    console.log(recipe);

    const handleEdit = (formData: FormData) => {
        // startTransition ensures that the action is done in order
        startTransition(async () => {
            await editRecipe(recipe.id, formData);
        });
    };

    return (
        <form className="flex flex-col gap-2" action={handleEdit}>
            <h3 className="font-bold">Create a recipe</h3>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="name">
                    Name
                </label>
                <input
                    id="title"
                    className="border rounded p-2 w-full"
                    name="name"
                    defaultValue={recipe.name}
                />
            </div>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="description">
                    Description
                </label>
                <input
                    id="description"
                    className="border rounded p-2 w-full"
                    name="description"
                    defaultValue={recipe.description || ""}
                />
            </div>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="ingredients">
                    Ingredients
                </label>
                <input id="ingredients" className="border rounded p-2 w-full" name="ingredients" />
            </div>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="instructions">
                    Instructions
                </label>
                <input
                    id="instructions"
                    className="border rounded p-2 w-full"
                    name="instructions"
                />
            </div>

            <button type="submit" className="rounded p-2 bg-blue-200 w-full">
                Save
            </button>
        </form>
    );
}
