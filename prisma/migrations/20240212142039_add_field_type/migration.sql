/*
  Warnings:

  - Added the required column `type` to the `LongShort` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "LongShort" ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ALTER COLUMN "date" SET DEFAULT now();
