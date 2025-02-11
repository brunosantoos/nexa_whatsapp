/*
  Warnings:

  - A unique constraint covering the columns `[idSector]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idToken]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idSector` to the `sectors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idToken` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sectors" ADD COLUMN     "idSector" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "idToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sectors_idSector_key" ON "sectors"("idSector");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_idToken_key" ON "tokens"("idToken");
