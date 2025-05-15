"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createRecipe(_: { message: string }, formData: FormData) {
  try {
    // Check the user's input and make sure they are valid
    const name = formData.get("name");
    const description = formData.get("description");

    if (typeof name !== "string" || name.length < 3) {
      return {
        message: "Name must be longer",
      };
    }

    if (typeof description !== "string") {
      return {
        message: "Description needs to be a string",
      };
    }

    // Create a new recipe and save to the database
    await db.recipe.create({
      data: {
        name,
        description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong.",
      };
    }
  }

  revalidatePath("/recipes"); // data change so get new cache version
  redirect("/recipes"); // NOTE redirect acts weird with try and catch so moved here
}

export async function editRecipe(id: string, formData: FormData) {
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

  revalidatePath(`/recipes/${id}`); // data change so get new cache version
  redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string) {
  // Create a new recipe and save to the database
  await db.recipe.delete({
    where: { id },
  });

  revalidatePath("/recipes"); // data change so get new cache version
  redirect("/recipes");
}
