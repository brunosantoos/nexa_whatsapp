/*
  Warnings:

  - Added the required column `course` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "course" TEXT NOT NULL;
