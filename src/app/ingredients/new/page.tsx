"use client";

import React, { useActionState, startTransition, useState } from "react";
import { createIngredient } from "@/actions";

import { Ingredient } from "@/generated/prisma";

const inputStyle = "border rounded p-2 w-full";

export default function IngredientCreatePage() {
    const [formState, action] = useActionState(createIngredient, { message: "" });
    const [newIngredients, setNewIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        description: "",
        weight: "",
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append("ingredients", JSON.stringify(newIngredients));

        startTransition(() => {
            action(formData);
        });
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h3 className="font-bold">Create a ingredient</h3>

            <div className="flex gap-2 items-center my-1">
                <div className="flex gap-4">
                    <input className={inputStyle} id="title" placeholder="Name" name="name" />
                </div>

                <div className="flex gap-4">
                    <input
                        className={inputStyle}
                        id="description"
                        placeholder="Description"
                        name="description"
                    />
                </div>

                <div className="flex gap-4">
                    <input className={inputStyle} id="weight" placeholder="Weight" name="weight" />
                </div>
            </div>

            {/* New Ingredient chart  */}
            <div>
                <p>New Ingredient Chart</p>

                {/* Top row: new ingredient inputs */}
                <div className="flex gap-2 items-center my-1">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newIngredient.name}
                        onChange={(e) =>
                            setNewIngredient({ ...newIngredient, name: e.target.value })
                        }
                        className="border rounded p-1"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newIngredient.description}
                        onChange={(e) =>
                            setNewIngredient({ ...newIngredient, description: e.target.value })
                        }
                        className="border rounded p-1"
                    />
                    <input
                        type="text"
                        placeholder="Weight"
                        value={newIngredient.weight}
                        onChange={(e) =>
                            setNewIngredient({ ...newIngredient, weight: e.target.value })
                        }
                        className="border rounded p-1 w-20"
                    />
                    {/* <button
                        type="button"
                        onClick={() => {
                            const ingredientToAdd: Ingredient = {
                                ...newIngredient,
                                id: `item-${newIngredients.length + 1}`,
                                instructionId: null,
                            };
                            setNewIngredients([...newIngredients, ingredientToAdd]);
                            setNewIngredient({ name: "", description: "", weight: "" }); // reset top row
                        }}
                        className="rounded p-2 bg-blue-200"
                    >
                        +
                    </button> */}
                </div>

                {/* Existing ingredients */}
                <div className="border p-2 rounded shadow flex flex-col gap-1">
                    {newIngredients.length > 0 ? (
                        newIngredients.map((ingredient, index) => (
                            <div key={ingredient.id} className="flex gap-2 items-center my-1">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={ingredient.name}
                                    onChange={(e) => {
                                        const updated = [...newIngredients];
                                        updated[index].name = e.target.value;
                                        setNewIngredients(updated);
                                    }}
                                    className="border rounded p-1"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={ingredient.description ?? ""}
                                    onChange={(e) => {
                                        const updated = [...newIngredients];
                                        updated[index].description = e.target.value;
                                        setNewIngredients(updated);
                                    }}
                                    className="border rounded p-1"
                                />
                                <input
                                    type="text"
                                    placeholder="Weight"
                                    value={ingredient.weight}
                                    onChange={(e) => {
                                        const updated = [...newIngredients];
                                        updated[index].weight = e.target.value;
                                        setNewIngredients(updated);
                                    }}
                                    className="border rounded p-1 w-20"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setNewIngredients(
                                            newIngredients.filter((_, i) => i !== index),
                                        );
                                    }}
                                    className="bg-red-200 p-1 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No ingredients</p>
                    )}
                </div>
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
