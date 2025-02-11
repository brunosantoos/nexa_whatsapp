/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `segmentations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "segmentations_name_key" ON "segmentations"("name");
