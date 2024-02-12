/*
  Warnings:

  - You are about to drop the column `type` on the `LongShort` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "LongShort" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ALTER COLUMN "date" SET DEFAULT now();
