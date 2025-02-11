-- DropIndex
DROP INDEX "status_id_key";

-- AlterTable
ALTER TABLE "status" ADD CONSTRAINT "status_pkey" PRIMARY KEY ("id");
