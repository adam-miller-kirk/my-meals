import { ShoppingGroup } from "@/generated/prisma/client";
import type { ShoppingItemBaseProps } from "./types";

export const defaultShoppingItem: ShoppingItemBaseProps = {
    name: "",
    group: ShoppingGroup.Unassigned,
};

export const shoppingGroupLabels: Record<ShoppingGroup, string> = {
    Unassigned: "Unassigned",
    FruitVeg: "Fruit & Veg",
    Meat: "Meat",
    Bakery: "Bakery",
    Cupboard: "Cupboard",
    FridgeFreezer: "Fridge / Freezer",
};

export const shoppingGroupOrder: ShoppingGroup[] = [
    ShoppingGroup.FruitVeg,
    ShoppingGroup.Meat,
    ShoppingGroup.Bakery,
    ShoppingGroup.Cupboard,
    ShoppingGroup.FridgeFreezer,
    ShoppingGroup.Unassigned,
];
