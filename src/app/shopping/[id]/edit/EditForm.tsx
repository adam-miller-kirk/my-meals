"use client";

import { useState, useActionState, startTransition } from "react";
import { editShoppingList } from "@/actions";

export default function EditForm({ id,  initialIngredients }: {  id: string;  initialIngredients: string[] }) {
    const [formState, action] = useActionState<{ message: string }, FormData>(editShoppingList, { message: "" });
    const [newShoppingList, setNewShoppingList] = useState<string[]>(initialIngredients || []);
    const [newShoppingItem, setNewShoippingItem] = useState("");

    function addItem() {
        if (!newShoppingItem.trim()) return;
        
        // Ensure first char is capital
        const formattedNewShoppingItem = newShoppingItem[0].toUpperCase() + newShoppingItem.slice(1);

        setNewShoppingList([formattedNewShoppingItem, ...newShoppingList]);
        setNewShoippingItem("");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {  action(formData) });
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            

            <button type="submit" className="rounded p-2 bg-blue-200 w-full">
                Update
            </button>

            {formState.message && (
                <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                    {formState.message}
                </div>
            )}

            <div>
                <h1 className="font-bold">New Shopping Item</h1>

                {/* Top row: new ingredient inputs */}
                <div className="flex gap-2 items-center my-1">
                    <input type="hidden" name="id" value={id} />
                    <input
                        type="text"
                        placeholder="Name"
                        value={newShoppingItem}
                        onChange={(e) => setNewShoippingItem(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // stop form submit
                                addItem();
                            }
                        }}
                        className="border rounded p-1"
                    />
                    <button
                        type="button"
                        onClick={addItem}
                        className="rounded p-2 bg-blue-200"
                        >
                        +
                    </button>
                </div>

                <h1 className="font-bold">Update Shopping List</h1>
                <div className="border p-2 rounded shadow flex flex-wrap gap-2">
                    {newShoppingList.length > 0 ? (
                        newShoppingList.map((ingredient, index) => (
                            <div key={`${ingredient}-${index}`} className="flex gap-2 items-center py-2 px-4  rounded">
                                <input
                                    name="ingredients[]"
                                    type="text"
                                    placeholder="Name"
                                    value={ingredient}
                                    onChange={(e) => {
                                        const updated = [...newShoppingList];
                                        updated[index] = e.target.value;
                                        setNewShoppingList(updated);
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setNewShoppingList(
                                            newShoppingList.filter((_, i) => i !== index),
                                        );
                                    }}
                                    className="bg-red-200 p-1 rounded w-10"
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
        </form>
    );
}