import ShoppingItemToggle from "@/features/shoppingList/components/shoppingItemToggle";
import { db } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { shoppingGroupLabels, shoppingGroupOrder } from "@/features/shoppingList/model/constants";
import { ShoppingGroup } from "@/generated/prisma";

export default async function ShoppingListPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const shoppingList = await db.shoppingList.findUnique({
        where: { id },
        include: { shoppingItems: true },
    });

    if (!shoppingList) {
        redirect("/shopping/new");
    }

    const groupedItems = shoppingList.shoppingItems.reduce<
        Record<ShoppingGroup, typeof shoppingList.shoppingItems>
    >(
        (groups, item) => {
            if (!groups[item.group]) groups[item.group] = [];
            groups[item.group].push(item);
            return groups;
        },
        {} as Record<ShoppingGroup, typeof shoppingList.shoppingItems>,
    );

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

            {shoppingGroupOrder.map((group) => {
                const items = groupedItems[group];
                if (!items || items.length === 0) return null;

                return (
                    <div key={group} className="border p-2 rounded shadow mb-4">
                        <h2 className="font-semibold mb-2">{shoppingGroupLabels[group]}</h2>
                        <div className="flex gap-2 flex-wrap">
                            {items.map((item) => (
                                <ShoppingItemToggle
                                    key={item.id}
                                    label={item.name}
                                    checked={item.checked}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
