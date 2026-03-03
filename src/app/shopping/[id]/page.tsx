import ShoppingItemToggle from "@/features/shoppingList/components/shoppingItemToggle";
import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ShoppingListPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const shoppingList = await db.shoppingList.findUnique({
        where: { id },
        include: { shoppingItems: true },
    });

    if (!shoppingList) {
        redirect("/shopping/new");
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Shopping List</h1>
                <div>
                    <Link
                        href={`/shopping/${shoppingList.id}/edit`}
                        className="border p-2 rounded mr-2"
                    >
                        Edit
                    </Link>
                    <Link href="/shopping/new" className="border p-2 rounded">
                        New
                    </Link>
                </div>
            </div>
            <div className="border p-2 rounded shadow flex gap-2 flex-wrap">
                {shoppingList.shoppingItems.map((item, index) => (
                    <ShoppingItemToggle key={`${item.name}-${index}`} label={item.name} />
                ))}
            </div>
        </div>
    );
}
