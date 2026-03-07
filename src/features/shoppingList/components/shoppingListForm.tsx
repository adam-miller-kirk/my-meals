"use client";

import { useState, useActionState, startTransition } from "react";
import {
    ShoppingGroup,
    ShoppingItemBaseProps,
    ShoppingListFormProps,
} from "@/features/shoppingList/model/types";
import {
    defaultShoppingItem,
    shoppingGroupLabels,
    shoppingGroupOrder,
} from "@/features/shoppingList/model/constants";
import { buildUpdatedShoppingList } from "../model/utils";
import Button from "@/components/Button";

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

    const groupedItems = items.reduce<Record<ShoppingGroup, ShoppingItemBaseProps[]>>(
        (groups, item) => {
            if (!groups[item.group]) groups[item.group] = [];
            groups[item.group].push(item);
            return groups;
        },
        {} as Record<ShoppingGroup, ShoppingItemBaseProps[]>,
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Button type="submit">{submitLabel}</Button>

            {formState.message && (
                <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
                    {formState.message}
                </div>
            )}

            {/* New item input section */}
            <h1 className="font-bold">New Shopping Item</h1>
            <div className="flex gap-2 items-center my-1">
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
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
                                {shoppingGroupLabels[group]}
                            </option>
                        ))}
                    </select>
                </div>
                <Button type="button" onClick={addItem}>
                    +
                </Button>
            </div>

            {/* new list items section */}
            {shoppingGroupOrder.map((group) => {
                const groupItems = groupedItems[group];
                if (!groupItems || groupItems.length === 0) return null;

                return (
                    <div key={group} className="border p-2 rounded shadow">
                        <h2 className="font-semibold mb-2">{shoppingGroupLabels[group]}</h2>
                        <div className="flex flex-wrap gap-2">
                            {groupItems.map((item, index) => (
                                <div
                                    key={`${item.name}-${index}`}
                                    className="flex gap-2 items-center py-2 px-4 rounded bg-gray-100"
                                >
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => {
                                            const updated = [...items];
                                            const globalIndex = items.findIndex((i) => i === item); // update in global array
                                            updated[globalIndex] = {
                                                ...updated[globalIndex],
                                                name: e.target.value,
                                            };
                                            setItems(updated);
                                        }}
                                        className="border rounded p-1 flex-1"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setItems(items.filter((i) => i !== item))}
                                        className="bg-red-200 p-1 rounded w-10"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* Hidden inputs to pass full object to action */}
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            {id && <input type="hidden" name="id" value={id} />}
        </form>
    );
}
