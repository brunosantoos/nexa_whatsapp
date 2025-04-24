/*
  Warnings:

  - You are about to drop the column `fileName` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `mediatype` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "fileName",
DROP COLUMN "imageUrl",
DROP COLUMN "mediatype",
DROP COLUMN "mimetype",
ADD COLUMN     "mediaUrl" TEXT;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_mediaUrl_fkey" FOREIGN KEY ("mediaUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;
