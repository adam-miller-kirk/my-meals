"use client";

import React, { useActionState, startTransition, useState } from "react";
import { createShoppingList } from "@/actions";
import { CreateShoppingItem, ShoppingGroup } from "@/types/shoppingList";
import { capitaliseWords } from "@/utils/wordFormatter";

const defaultShoppingItem: CreateShoppingItem = { name: "", group: ShoppingGroup.Unassigned }

export default function NewShoppingListPage() {
    const [formState, action] = useActionState<{ message: string }, FormData>(createShoppingList, { message: "" });
    const [newShoppingList, setNewShoppingList] = useState<CreateShoppingItem[]>([]);
    const [newShoppingItem, setNewShoippingItem] = useState<CreateShoppingItem>(defaultShoppingItem);
    
    function addItem() {
        const { name } = newShoppingItem;
        
        if (!newShoppingItem.name.trim()) return;
        
        setNewShoppingList([{ ...newShoppingItem, name:  capitaliseWords(name)}, ...newShoppingList]);
        setNewShoippingItem({ name: "", group: newShoppingItem.group});
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {  action(formData) });
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

            <button type="submit" className="rounded p-2 bg-blue-200 w-full">
                Create
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
                    <div className="flex flex-col gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newShoppingItem.name}
                            onChange={(e) =>
                                setNewShoippingItem((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // stop form submit
                                    addItem();
                                }
                            }}
                            className="border rounded p-1"
                        />
                        <select
                            value={newShoppingItem.group}
                            onChange={(e) =>
                                setNewShoippingItem((prev) => ({
                                ...prev,
                                group: e.target.value as ShoppingGroup,
                                }))
                            }
                            className="border rounded p-1"
                            >
                            {Object.values(ShoppingGroup).map((group) => (
                                <option key={group} value={group}>
                                {group}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={addItem}
                        className="rounded p-2 bg-blue-200"
                        >
                        +
                    </button>
                </div>

                {/* The true object we pass through */}
                <input
                    type="hidden"
                    name="items"
                    value={JSON.stringify(newShoppingList)}
                />

                <h1 className="font-bold">New Shopping List</h1>
                <div className="border p-2 rounded shadow flex flex-wrap gap-2">
                    {newShoppingList.length > 0 ? (
                        newShoppingList.map((shoppingItem, index) => (
                            <div key={`${shoppingItem.name}-${index}`} className="flex gap-2 items-center py-2 px-4  rounded">
                                <input
                                    name="ingredients[]"
                                    type="text"
                                    placeholder="Name"
                                    value={shoppingItem.name}
                                    onChange={(e) => {
                                        const updated = [...newShoppingList];
                                        updated[index] = {
                                            ...updated[index],
                                            name: e.target.value,
                                        };
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
                        <p>Add a shopping item</p>
                    )}
                </div>
            </div>



        </form>
    );
}
