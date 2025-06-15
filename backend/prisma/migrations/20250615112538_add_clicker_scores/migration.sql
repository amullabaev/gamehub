-- CreateTable
CREATE TABLE "ClickerScore" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClickerScore_pkey" PRIMARY KEY ("id")
);
