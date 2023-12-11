-- CreateTable
CREATE TABLE "ScoreCard" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "employeeScore" INTEGER[],
    "councilScore" INTEGER[],
    "administrationScore" INTEGER[],
    "comment" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "ScoreCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreCard" ADD CONSTRAINT "ScoreCard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
