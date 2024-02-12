-- AlterTable
ALTER TABLE "Entrie" ADD COLUMN     "lsId" TEXT,
ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ALTER COLUMN "date" SET DEFAULT now();

-- CreateTable
CREATE TABLE "LongShort" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "LongShort_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entrie" ADD CONSTRAINT "Entrie_lsId_fkey" FOREIGN KEY ("lsId") REFERENCES "LongShort"("id") ON DELETE SET NULL ON UPDATE CASCADE;
