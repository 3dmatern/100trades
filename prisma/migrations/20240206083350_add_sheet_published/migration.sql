-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- CreateTable
CREATE TABLE "SheetPublished" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "name" TEXT,
    "pose" TEXT,
    "risk" TEXT,
    "profit" TEXT,
    "entryDate" TEXT,
    "imageStart" TEXT,
    "deposit" TEXT,
    "progress" TEXT,
    "exitDate" TEXT,
    "imageEnd" TEXT,
    "take" TEXT,
    "stress" TEXT,
    "notes" TEXT,
    "timeInTrade" TEXT,
    "resultId" TEXT,
    "rrId" TEXT,
    "entrieTag" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "SheetPublished_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SheetPublished_sheetId_key" ON "SheetPublished"("sheetId");

-- AddForeignKey
ALTER TABLE "SheetPublished" ADD CONSTRAINT "SheetPublished_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SheetPublished" ADD CONSTRAINT "SheetPublished_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
