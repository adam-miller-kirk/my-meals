"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editRecipe(id: string, formData: FormData) {
  console.log(`edit form, ${id}`);
  // Check the user's input and make sure they are valid
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  console.log(`Form date ${name}, ${description}`);

  // Create a new recipe and save to the database
  await db.recipe.update({
    where: { id },
    data: {
      name,
      description,
    },
  });

  redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string) {
  // Create a new recipe and save to the database
  await db.recipe.delete({
    where: { id },
  });

  redirect("/recipes");
}
