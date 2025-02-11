-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_digest" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "slug" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Greeting" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Greeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorsId" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TokenId" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sellers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "messages_slug_key" ON "messages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SectorsId_id_key" ON "SectorsId"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenId_id_key" ON "TokenId"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_id_key" ON "Sellers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_email_key" ON "Sellers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_phone_key" ON "Sellers"("phone");
