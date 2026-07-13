/*
  Warnings:

  - You are about to drop the column `perdiod` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "perdiod",
ADD COLUMN     "period" TEXT NOT NULL DEFAULT 'H';
