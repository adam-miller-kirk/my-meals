import { createShoppingList } from "@/features/shoppingList/actions/creteShoppingList";
import ShoppingListForm from "@/features/shoppingList/components/shoppingListForm";

export default function NewShoppingListPage() {
    return <ShoppingListForm initialItems={[]} action={createShoppingList} submitLabel="Create" />;
}
