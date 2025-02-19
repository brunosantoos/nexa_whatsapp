-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "messageRemaining" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "messageSend" INTEGER NOT NULL DEFAULT 0;
