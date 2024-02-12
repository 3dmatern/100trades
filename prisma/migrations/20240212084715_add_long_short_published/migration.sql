-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ADD COLUMN     "lsId" TEXT,
ALTER COLUMN "date" SET DEFAULT now();
