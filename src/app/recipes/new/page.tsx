"use client";

import React, { useActionState, startTransition } from "react";
import { createRecipe } from "@/actions";

export default function RecipeCreatePage() {
    const [formState, action] = useActionState(createRecipe, { message: "" });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        startTransition(() => {
            action(formData);
        });
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h3 className="font-bold">Create a recipe</h3>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="name">
                    Name
                </label>
                <input id="title" className="border rounded p-2 w-full" name="name" />
            </div>
            <div className="flex gap-4">
                <label className="w-24" htmlFor="description">
                    Description
                </label>
                <input id="description" className="border rounded p-2 w-full" name="description" />
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

            {formState.message && (
                <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                    {formState.message}
                </div>
            )}

            <button type="submit" className="rounded p-2 bg-blue-200 w-full">
                Create
            </button>
        </form>
    );
}
