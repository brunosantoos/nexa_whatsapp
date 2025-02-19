/*
  Warnings:

  - Added the required column `adminId` to the `report_sends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report_sends" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "report_sends" ADD CONSTRAINT "report_sends_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
