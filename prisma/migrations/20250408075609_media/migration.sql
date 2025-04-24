-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "haveMedia" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Media" (
    "url" TEXT NOT NULL,
    "mine" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("url")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");
