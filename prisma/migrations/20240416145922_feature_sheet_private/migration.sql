-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTake" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ALTER COLUMN "date" SET DEFAULT now();

-- CreateTable
CREATE TABLE "SheetPrivate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "name" TEXT,
    "pose" TEXT,
    "risk" TEXT,
    "profit" TEXT,
    "forecast" TEXT,
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
    "lsId" TEXT,
    "rrId" TEXT,
    "entrieTag" TEXT,
    "entrieTake" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT now(),

    CONSTRAINT "SheetPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SheetPrivate_sheetId_key" ON "SheetPrivate"("sheetId");

-- AddForeignKey
ALTER TABLE "SheetPrivate" ADD CONSTRAINT "SheetPrivate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SheetPrivate" ADD CONSTRAINT "SheetPrivate_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
