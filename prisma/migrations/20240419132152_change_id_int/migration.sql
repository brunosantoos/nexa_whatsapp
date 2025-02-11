/*
  Warnings:

  - The `id` column on the `sectors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sectors" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sectors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tokens_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_id_key" ON "sectors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");
