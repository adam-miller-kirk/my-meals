import { db } from "@/db";
import EditForm from "./EditForm";
import type { CreateShoppingItem } from "@/types/shoppingList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const shoppingList = await db.shoppingList.findUnique({
    where: { id },
    include: { shoppingItems: true },
  });

  const initialItems: CreateShoppingItem[] =
    shoppingList?.shoppingItems.map((item) => ({
      name: item.name,
      group: item.group,
    })) || [];

  return <EditForm id={id} initialItems={initialItems} />;
}