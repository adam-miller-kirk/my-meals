import { capitaliseWords } from "@/utils/wordFormatter";
import {
    ParsedShoppingItem,
    ParseShoppingItemsResult,
    ShoppingGroup,
    ShoppingItemBaseProps,
} from "./types";

export function buildUpdatedShoppingList(
    currentList: ShoppingItemBaseProps[],
    newItem: ShoppingItemBaseProps,
): ShoppingItemBaseProps[] {
    if (!newItem.name.trim()) return currentList;

    return [{ ...newItem, name: capitaliseWords(newItem.name) }, ...currentList];
}

export function parseShoppingListId(formData: FormData) {
    const rawId = formData.get("id");

    if (typeof rawId !== "string" || rawId.trim().length === 0) {
        return { success: false, error: "Missing shopping list ID." };
    }

    return { success: true, id: rawId };
}

function isShoppingItem(value: unknown): value is ParsedShoppingItem {
    if (typeof value !== "object" || value === null) return false;

    if (!("name" in value) || !("group" in value)) return false;

    const { name, group } = value as { name: unknown; group: unknown };
    const validGroups = Object.values(ShoppingGroup);

    return (
        typeof name === "string" &&
        name.trim().length > 0 &&
        validGroups.includes(group as ShoppingGroup)
    );
}

export function parseShoppingItems(formData: FormData): ParseShoppingItemsResult {
    const rawItems = formData.get("items");

    if (!rawItems || typeof rawItems !== "string") {
        return { success: false, error: "Must include at least 1 shopping item" };
    }

    let parsed: unknown;

    try {
        parsed = JSON.parse(rawItems);
    } catch {
        return { success: false, error: "Invalid JSON format" };
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
        return { success: false, error: "Must include at least 1 shopping item" };
    }

    const validated: ParsedShoppingItem[] = [];

    for (const item of parsed) {
        if (!isShoppingItem(item)) {
            return { success: false, error: "Invalid shopping item data" };
        }

        validated.push({
            name: item.name.trim(),
            group: item.group,
        });
    }

    return { success: true, shoppingItems: validated };
}
