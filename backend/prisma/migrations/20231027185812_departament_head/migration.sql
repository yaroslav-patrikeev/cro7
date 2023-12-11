/*
  Warnings:

  - A unique constraint covering the columns `[departament_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departament_id" TEXT;

-- CreateTable
CREATE TABLE "Departament" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Head" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "departament_id" TEXT NOT NULL,

    CONSTRAINT "Head_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Head_departament_id_key" ON "Head"("departament_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_departament_id_key" ON "User"("departament_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departament_id_fkey" FOREIGN KEY ("departament_id") REFERENCES "Departament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Head" ADD CONSTRAINT "Head_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Head" ADD CONSTRAINT "Head_departament_id_fkey" FOREIGN KEY ("departament_id") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
