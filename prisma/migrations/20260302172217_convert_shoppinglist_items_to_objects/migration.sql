-- CreateEnum
CREATE TYPE "ShoppingGroup" AS ENUM ('Unassigned', 'FruitVeg', 'Meat', 'Bakery', 'Cupboard', 'FridgeFreezer');

-- CreateTable
CREATE TABLE "ShoppingItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "group" "ShoppingGroup" NOT NULL DEFAULT 'Unassigned',
    "listId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingItem" ADD CONSTRAINT "ShoppingItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
