/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_number_key" ON "tokens"("number");
