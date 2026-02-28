/*
  Warnings:

  - You are about to drop the `Shopping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Shopping";

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredients" TEXT[],

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);
