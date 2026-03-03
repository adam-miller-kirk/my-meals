import type { ShoppingList, ShoppingItem, ShoppingGroup } from "@/generated/prisma/client";
export { ShoppingGroup } from "@/generated/prisma/client";

export type ShoppingItemType = ShoppingItem;
export type ShoppingListType = ShoppingList & { shoppingItems: ShoppingItemType[] };

export type ShoppingItemBaseProps = Pick<ShoppingItem, "name" | "group">;

export type ShoppingListAction = (
    prevState: { message: string },
    formData: FormData,
) => Promise<{ message: string }>;

export type ShoppingListFormProps = {
    initialItems: ShoppingItemBaseProps[];
    action: (prevState: { message: string }, formData: FormData) => Promise<{ message: string }>;
    submitLabel: string;
    id?: string;
};

export type ParsedShoppingItem = {
    name: string;
    group: ShoppingGroup;
};

export type ParseShoppingItemsResult =
    | { success: true; shoppingItems: ParsedShoppingItem[] }
    | { success: false; error: string };
