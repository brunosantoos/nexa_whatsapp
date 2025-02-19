/*
  Warnings:

  - You are about to drop the column `course` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the `sectors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sellers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "course",
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "sectors";

-- DropTable
DROP TABLE "sellers";

-- DropTable
DROP TABLE "status";
