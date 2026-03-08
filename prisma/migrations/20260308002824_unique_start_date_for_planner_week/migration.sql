/*
  Warnings:

  - A unique constraint covering the columns `[startDate]` on the table `PlannerWeek` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlannerWeek_startDate_key" ON "PlannerWeek"("startDate");
