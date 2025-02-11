/*
  Warnings:

  - You are about to drop the `Greeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectorsId` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sellers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Greeting";

-- DropTable
DROP TABLE "SectorsId";

-- DropTable
DROP TABLE "Sellers";

-- DropTable
DROP TABLE "TokenId";

-- CreateTable
CREATE TABLE "greetings" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "greetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sellers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sectors_id_key" ON "sectors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_id_key" ON "tokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_id_key" ON "sellers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_email_key" ON "sellers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_phone_key" ON "sellers"("phone");
