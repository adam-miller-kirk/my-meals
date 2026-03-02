"use client";

import { useState, useActionState, startTransition } from "react";
import { editShoppingList } from "@/actions";
import { CreateShoppingItem, ShoppingGroup } from "@/types/shoppingList";
import { capitaliseWords } from "@/utils/wordFormatter";

type Props = {
  id: string;
  initialItems: CreateShoppingItem[];
};

const defaultShoppingItem: CreateShoppingItem = {
  name: "",
  group: ShoppingGroup.Unassigned,
};

export default function EditForm({ id, initialItems }: Props) {
  const [formState, action] = useActionState<{ message: string }, FormData>(
    editShoppingList,
    { message: "" }
  );

  const [newShoppingList, setNewShoppingList] =
    useState<CreateShoppingItem[]>(initialItems || []);

  const [newShoppingItem, setNewShoppingItem] =
    useState<CreateShoppingItem>(defaultShoppingItem);

  function addItem() {
    const { name } = newShoppingItem;

    if (!name.trim()) return;

    setNewShoppingList([
      { ...newShoppingItem, name: capitaliseWords(name) },
      ...newShoppingList,
    ]);

    // keep selected group
    setNewShoppingItem({ name: "", group: newShoppingItem.group });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {/* Required for edit */}
      <input type="hidden" name="id" value={id} />

      {/* The real payload */}
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(newShoppingList)}
      />

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

        <div className="flex gap-2 items-center my-1">
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Name"
              value={newShoppingItem.name}
              onChange={(e) =>
                setNewShoppingItem((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
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
              value={newShoppingItem.group}
              onChange={(e) =>
                setNewShoppingItem((prev) => ({
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

        <h1 className="font-bold">Update Shopping List</h1>

        <div className="border p-2 rounded shadow flex flex-wrap gap-2">
          {newShoppingList.length > 0 ? (
            newShoppingList.map((shoppingItem, index) => (
              <div
                key={`${shoppingItem.name}-${index}`}
                className="flex gap-2 items-center py-2 px-4 rounded w-full"
              >
                <div className="flex flex-col gap-2 w-full">
                    <input
                    type="text"
                    value={shoppingItem.name}
                    onChange={(e) => {
                        const updated = [...newShoppingList];
                        updated[index] = {
                        ...updated[index],
                        name: e.target.value,
                        };
                        setNewShoppingList(updated);
                    }}
                    className="border rounded p-1"
                    />

                    <select
                    value={shoppingItem.group}
                    onChange={(e) => {
                        const updated = [...newShoppingList];
                        updated[index] = {
                        ...updated[index],
                        group: e.target.value as ShoppingGroup,
                        };
                        setNewShoppingList(updated);
                    }}
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
                  onClick={() =>
                    setNewShoppingList((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
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
