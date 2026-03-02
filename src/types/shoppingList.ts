import type { ShoppingList, ShoppingItem } from "@/generated/prisma/client";
export { ShoppingGroup } from "@/generated/prisma/client";

export type ShoppingItemType = ShoppingItem;
export type ShoppingListType = ShoppingList & {
  shoppingItems: ShoppingItemType[];
};

export type CreateShoppingItem = Pick<
  ShoppingItem,
  'name' | 'group'
>