/*
  Warnings:

  - You are about to drop the `ScoreCardField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fields` to the `ScoreCardPattern` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScoreCardField" DROP CONSTRAINT "ScoreCardField_scorecard_pattern_id_fkey";

-- AlterTable
ALTER TABLE "ScoreCardPattern" ADD COLUMN     "fields" JSONB NOT NULL;

-- DropTable
DROP TABLE "ScoreCardField";
