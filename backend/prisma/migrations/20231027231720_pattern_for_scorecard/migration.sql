/*
  Warnings:

  - You are about to drop the column `departament_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Head` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Head" DROP CONSTRAINT "Head_departament_id_fkey";

-- DropForeignKey
ALTER TABLE "Head" DROP CONSTRAINT "Head_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departament_id_fkey";

-- DropIndex
DROP INDEX "User_departament_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "departament_id";

-- DropTable
DROP TABLE "Departament";

-- DropTable
DROP TABLE "Head";

-- CreateTable
CREATE TABLE "ScoreCardPattern" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "positions" TEXT[],

    CONSTRAINT "ScoreCardPattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreCardField" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "scorecard_pattern_id" TEXT,

    CONSTRAINT "ScoreCardField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScoreCardField" ADD CONSTRAINT "ScoreCardField_scorecard_pattern_id_fkey" FOREIGN KEY ("scorecard_pattern_id") REFERENCES "ScoreCardPattern"("id") ON DELETE SET NULL ON UPDATE CASCADE;
