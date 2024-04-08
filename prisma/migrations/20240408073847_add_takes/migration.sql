-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "EntrieTag" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "Sheet" ALTER COLUMN "date" SET DEFAULT now();

-- AlterTable
ALTER TABLE "SheetPublished" ADD COLUMN     "entrieTake" TEXT,
ALTER COLUMN "date" SET DEFAULT now();

-- CreateTable
CREATE TABLE "Take" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Take_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrieTake" (
    "id" TEXT NOT NULL,
    "entrieId" TEXT NOT NULL,
    "takeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntrieTake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Take" ADD CONSTRAINT "Take_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntrieTake" ADD CONSTRAINT "EntrieTake_entrieId_fkey" FOREIGN KEY ("entrieId") REFERENCES "Entrie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrieTake" ADD CONSTRAINT "EntrieTake_takeId_fkey" FOREIGN KEY ("takeId") REFERENCES "Take"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
