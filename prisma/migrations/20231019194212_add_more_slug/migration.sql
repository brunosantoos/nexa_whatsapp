/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "messages_slug_key";

-- AlterTable
ALTER TABLE "messages" DROP CONSTRAINT "messages_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");
