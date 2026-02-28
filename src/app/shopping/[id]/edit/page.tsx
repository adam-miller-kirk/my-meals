import { db } from "@/db";
import EditForm from "./EditForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const shoppingList = await db.shoppingList.findUnique({
    where: { id },
  });

  return (
    <EditForm
      id={id}
      initialIngredients={shoppingList?.ingredients || []}
    />
  );
}