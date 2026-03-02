"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ShoppingGroup } from "@/generated/prisma";

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
    await db.recipe.delete({
        where: { id },
    });

    revalidatePath("/recipes"); // data change so get new cache version
    redirect("/recipes");
}

export async function createIngredient(_: { message: string }, formData: FormData) {
    try {
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

        await db.ingredient.create({
            data: {
                name,
                description,
                recipeId: null,
                instructionId: null,
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
    revalidatePath("/ingredients"); // data change so get new cache version
    redirect("/ingredients");
}

export async function editIngredient(id: string, formData: FormData) {
    // Check the user's input and make sure they are valid
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    // const weight = formData.get("weight") as string;

    await db.ingredient.update({
        where: { id },
        data: {
            name,
            description,
        },
    });
    revalidatePath(`/ingredients/${id}`); // data change so get new cache version
    redirect(`/ingredients/${id}`);
}

export async function deleteIngredient(id: string) {
    await db.ingredient.delete({
        where: { id },
    });
    revalidatePath("/ingredients"); // data change so get new cache version
    redirect("/ingredients");
}

export async function createShoppingList(
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  try {
    const rawItems = formData.get("items");

    if (!rawItems || typeof rawItems !== "string") {
      return { message: "Must include at least 1 shopping item" };
    }

    const shoppingItems = JSON.parse(rawItems);

    if (!Array.isArray(shoppingItems) || shoppingItems.length === 0) {
      return { message: "Must include at least 1 shopping item" };
    }

    // Basic validation
    if (
      !shoppingItems.every(
        (item) =>
          typeof item.name === "string" &&
          item.name.trim().length > 0 &&
          Object.values(ShoppingGroup).includes(item.group)
      )
    ) {
      return { message: "Invalid shopping item data" };
    }

    await db.shoppingList.create({
      data: {
        shoppingItems: {
          create: shoppingItems.map((item) => ({
            name: item.name.trim(),
            group: item.group,
            // checked defaults to false automatically
          })),
        },
      },
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong." };
    }
  }

  revalidatePath("/shopping");
  redirect("/shopping");
}

export async function editShoppingList(
  _: { message: string },
  formData: FormData
) {
    const id = formData.get("id") as string;

    if (!id) {
    return { message: "Missing shopping list ID." };
    }

    try {
    const rawItems = formData.get("items");

    if (!rawItems || typeof rawItems !== "string") {
        return { message: "Must include at least 1 shopping item" };
    }

    const shoppingItems = JSON.parse(rawItems);

    if (!Array.isArray(shoppingItems) || shoppingItems.length === 0) {
        return { message: "Must include at least 1 shopping item" };
    }

    if (
        !shoppingItems.every(
        (item) =>
            typeof item.name === "string" &&
            item.name.trim().length > 0 &&
            typeof item.group === "string"
        )
    ) {
        return { message: "Invalid shopping item data" };
    }

    await db.shoppingList.update({
        where: { id },
        data: {
        shoppingItems: {
            deleteMany: {}, // delete all existing items
            create: shoppingItems.map((item) => ({
            name: item.name.trim(),
            group: item.group,
            })),
        },
        },
    });

    } catch (err) {
    if (err instanceof Error) {
        return { message: err.message };
    }

    return { message: "Could not update shopping list." };
}

  revalidatePath("/shopping");
  redirect("/shopping");
}

export async function deleteShoppingListRecipe(id: string) {
    await db.shoppingList.delete({
        where: { id },
    });

    revalidatePath("/shopping"); // data change so get new cache version
    redirect("/shopping");
}
