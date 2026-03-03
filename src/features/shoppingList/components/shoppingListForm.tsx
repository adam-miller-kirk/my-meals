"use client";

import { useState, useActionState, startTransition } from "react";
import {
    ShoppingGroup,
    ShoppingItemBaseProps,
    ShoppingListFormProps,
} from "@/features/shoppingList/model/types";
import { defaultShoppingItem } from "@/features/shoppingList/model/constant";
import { buildUpdatedShoppingList } from "../model/utils";

export default function ShoppingListForm({
    initialItems,
    action,
    submitLabel,
    id,
}: ShoppingListFormProps) {
    const [formState, formAction] = useActionState<{ message: string }, FormData>(action, {
        message: "",
    });
    const [items, setItems] = useState<ShoppingItemBaseProps[]>(initialItems);
    const [newItem, setNewItem] = useState<ShoppingItemBaseProps>(defaultShoppingItem);

    function addItem() {
        setItems((prev) => buildUpdatedShoppingList(prev, newItem));
        setNewItem({ name: "", group: newItem.group });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <button type="submit" className="rounded p-2 bg-blue-200 w-full">
                {submitLabel}
            </button>

            {formState.message && (
                <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                    {formState.message}
                </div>
            )}

            <div>
                {/* New item input section */}
                <h1 className="font-bold">New Shopping Item</h1>
                <div className="flex gap-2 items-center my-1">
                    <div className="flex flex-col gap-2 w-full">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newItem.name}
                            onChange={(e) =>
                                setNewItem((prev) => ({ ...prev, name: e.target.value }))
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addItem();
                                }
                            }}
                            className="border rounded p-1"
                        />
                        <select
                            value={newItem.group}
                            onChange={(e) =>
                                setNewItem((prev) => ({
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
                    <button type="button" onClick={addItem} className="rounded p-2 bg-blue-200">
                        +
                    </button>
                </div>

                {/* new list items section */}
                <h1 className="font-bold">New Shopping List</h1>
                <div className="border p-2 rounded shadow flex flex-wrap gap-2">
                    {items.length > 0 ? (
                        items.map((shoppingItem, index) => (
                            <div
                                key={`${shoppingItem.name}-${index}`}
                                className="flex gap-2 items-center py-2 px-4  rounded"
                            >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={shoppingItem.name}
                                    onChange={(e) => {
                                        const updated = [...items];
                                        updated[index] = {
                                            ...updated[index],
                                            name: e.target.value,
                                        };
                                        setItems(updated);
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setItems(items.filter((_, i) => i !== index));
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

            {/* Hidden inputs to pass full object to action */}
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            {id && <input type="hidden" name="id" value={id} />}
        </form>
    );
}
