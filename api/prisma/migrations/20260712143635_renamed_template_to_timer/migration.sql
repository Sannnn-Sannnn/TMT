/*
  Warnings:

  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_userId_fkey";

-- DropTable
DROP TABLE "Template";

-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "intervalLength" INTEGER NOT NULL,
    "breakLength" INTEGER NOT NULL,
    "totalIntervals" INTEGER NOT NULL,
    "autoStart" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
