const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ITEMS = [
  "name",
  "resultId",
  "lsId",
  "pose",
  "risk",
  "profit",
  //  "forecast",
  "entrieTake",
  //  "rrId",
  "entryDate",
  "imageStart",
  "deposit",
  "progress",
  "exitDate",
  "imageEnd",
  "take",
  "stress",
  "entrieTag",
  "notes",
  "timeInTrade"
];

async function createSheetPrivate() {
    const allSheets = await prisma.sheet.findMany();
    // Создаем массив объектов с данными для создания записей
    const dataToCreate = allSheets.map((sheet) => ({
        sheetId: sheet.id,
        userId: sheet.userId,
        ...ITEMS.reduce((acc, field) => {
          acc[field] = field;
          return acc;
        }, {}),
    }));

    const createSP = await prisma.sheetPrivate.createMany({
        data: dataToCreate
    });

    console.log(`Создал настроек для ${createSP.count} журналов :)`);
};

createSheetPrivate()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });