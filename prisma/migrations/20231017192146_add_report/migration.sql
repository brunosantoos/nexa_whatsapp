-- CreateTable
CREATE TABLE "report_sends" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_sends_pkey" PRIMARY KEY ("id")
);
