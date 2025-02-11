-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "segmentations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "segmentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToSegmentation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactToSegmentation_AB_unique" ON "_ContactToSegmentation"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactToSegmentation_B_index" ON "_ContactToSegmentation"("B");

-- AddForeignKey
ALTER TABLE "_ContactToSegmentation" ADD CONSTRAINT "_ContactToSegmentation_A_fkey" FOREIGN KEY ("A") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToSegmentation" ADD CONSTRAINT "_ContactToSegmentation_B_fkey" FOREIGN KEY ("B") REFERENCES "segmentations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
