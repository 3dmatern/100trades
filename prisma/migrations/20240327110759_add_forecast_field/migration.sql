-- AlterTable
ALTER TABLE "Entrie" ADD COLUMN     "forecast" TEXT,
ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ALTER COLUMN "date" SET DEFAULT now();
