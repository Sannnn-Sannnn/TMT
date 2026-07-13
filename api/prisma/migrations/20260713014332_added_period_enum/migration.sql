/*
  Warnings:

  - Changed the type of `period` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Period" AS ENUM ('today', 'week', 'month');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "period",
ADD COLUMN     "period" "Period" NOT NULL;
