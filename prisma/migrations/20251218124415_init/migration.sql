-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('RECIPE', 'TAKEAWAY', 'OTHER');

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "weight" TEXT,
    "recipeId" TEXT,
    "instructionId" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "time" TEXT NOT NULL,
    "recipeId" TEXT,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerDay" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "DayType" NOT NULL,
    "recipeId" TEXT,
    "notes" TEXT,
    "weekId" TEXT NOT NULL,

    CONSTRAINT "PlannerDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerWeek" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "yearId" TEXT NOT NULL,

    CONSTRAINT "PlannerWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannerYear" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "PlannerYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlannerDay_date_key" ON "PlannerDay"("date");

-- CreateIndex
CREATE UNIQUE INDEX "PlannerYear_year_key" ON "PlannerYear"("year");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_instructionId_fkey" FOREIGN KEY ("instructionId") REFERENCES "Instruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerDay" ADD CONSTRAINT "PlannerDay_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerDay" ADD CONSTRAINT "PlannerDay_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "PlannerWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannerWeek" ADD CONSTRAINT "PlannerWeek_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "PlannerYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
