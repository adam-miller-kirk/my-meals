import { ShoppingGroup } from "@/generated/prisma/client";
import type { ShoppingItemBaseProps } from "./types";

export const defaultShoppingItem: ShoppingItemBaseProps = {
    name: "",
    group: ShoppingGroup.Unassigned,
};
