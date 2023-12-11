/*
  Warnings:

  - The primary key for the `Lunch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_LunchToUser" DROP CONSTRAINT "_LunchToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LunchToUser" DROP CONSTRAINT "_LunchToUser_B_fkey";

-- AlterTable
ALTER TABLE "Lunch" DROP CONSTRAINT "Lunch_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lunch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lunch_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_LunchToUser" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_LunchToUser" ADD CONSTRAINT "_LunchToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lunch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LunchToUser" ADD CONSTRAINT "_LunchToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
