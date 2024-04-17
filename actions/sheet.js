"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetCreateSchema, SheetUpdateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import {
  getSheetById,
  getSheetsByUserId,
  getSheetsWithEntrieByUserId,
} from "@/data/sheet";
import { getEntriesBySheetId } from "@/data/entrie";
import { deleteFile } from "./files";

export const createSheet = async (values) => {
  noStore();
  const validatedFields = SheetCreateSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const { userId, name } = validatedFields.data;

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const newSheet = await db.sheet.create({
      data: {
        userId,
        name,
      },
    });
    await db.sheetPrivate.create({
      data: {
        sheetId: newSheet.id,
        userId,
        name: "name",
        resultId: "resultId",
        lsId: "lsId",
        pose: "pose",
        risk: "risk",
        profit: "profit",
        forecast: null,
        entrieTake: "entrieTake",
        rrId: null,
        entryDate: "entryDate",
        imageStart: "imageStart",
        deposit: "deposit",
        progress: "progress",
        exitDate: "exitDate",
        imageEnd: "imageEnd",
        take: "take",
        stress: "stress",
        entrieTag: "entrieTag",
        notes: "notes",
        timeInTrade: "timeInTrade",
      }
    });

    revalidatePath("/sheets");

    return {
      newSheet,
      success: "Лист успешно создан",
    };
  } catch (error) {
    console.error("Error creating sheet: ", error);
    return {
      error: "Ошибка создания листа!",
    };
  }
};

export const getSheets = async (userId) => {
  noStore();
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const sheets = await getSheetsByUserId(existingUser.id);

    return sheets;
  } catch (error) {
    console.error("Error receiving sheets: ", error);
    return {
      error: "Ошибка получения листов!",
    };
  }
};

export const getSheetsWithEntrieWL = async ({ userId, winID, lossID }) => {
  noStore();
  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return {
      redirect: "/",
    };
  }

  try {
    let entries = [];
    const sheets = await getSheetsWithEntrieByUserId({
      userId: existingUser.id,
      winID,
      lossID,
    });

    for (const sheet of sheets) {
      if (sheet.entries?.length) {
        entries = [...entries, ...sheet.entries];
      }
    }

    return entries.map((entrie) => ({
      ...entrie,
      name: entrie.name?.toUpperCase(),
    }));
  } catch (error) {
    console.error("Error receiving sheetsWithEntrieWL: ", error);
    return {
      error: "Ошибка получения листов с сделками!",
    };
  }
};

export const getSheet = async (sheetId) => {
  noStore();

  try {
    const sheet = getSheetById(sheetId);

    return sheet;
  } catch (error) {
    console.error("Error receiving sheets: ", error);
    return {
      error: "Ошибка получения листа!",
    };
  }
};

export const updateSheet = async (values) => {
  noStore();
  const validatedFields = SheetUpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const { id, userId, name } = validatedFields.data;

  const existingSheet = await getSheetById(id);

  if (!existingSheet) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const updSheet = await db.sheet.update({
      where: {
        id: existingSheet.id,
      },
      data: {
        name,
      },
    });

    revalidatePath(`/sheets/${existingSheet.id}`);

    return {
      payload: updSheet,
      success: "Лист успешно обновлен!",
    };
  } catch (error) {
    console.error("Sheet update error: ", error);
    return {
      error: "Ошибка обновления листа!",
    };
  }
};

export const updateSheetPrivate = async ({ userId, sheetId, items }) => {
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingSheet = await getSheetById(sheetId);
  if (!existingSheet || existingSheet.userId !== existingUser.id) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  let {
    name,
    pose,
    risk,
    profit,
    forecast,
    entryDate,
    imageStart,
    deposit,
    progress,
    exitDate,
    imageEnd,
    take,
    stress,
    notes,
    timeInTrade,
    resultId,
    lsId,
    rrId,
    entrieTag,
    entrieTake,
  } = items.reduce((acc, field) => {
    acc[field] = field;
    return acc;
  }, {});

  try {
    const updSheetPrivate = await db.sheetPrivate.update({
      where: { sheetId: existingSheet.id },
      data: {
        userId: existingUser.id,
        sheetId: existingSheet.id,
        name: name || null,
        resultId: resultId || null,
        lsId: lsId || null,
        pose: pose || null,
        risk: risk || null,
        profit: profit || null,
        forecast: forecast || null,
        rrId: rrId || null,
        entryDate: entryDate || null,
        imageStart: imageStart || null,
        deposit: deposit || null,
        progress: progress || null,
        exitDate: exitDate || null,
        imageEnd: imageEnd || null,
        take: take || null,
        stress: stress || null,
        entrieTag: entrieTag || null,
        entrieTake: entrieTake || null,
        notes: notes || null,
        timeInTrade: timeInTrade || null,
      },
    });

    return {
      updSheetPrivate,
      success: "Настройки успешно обновлены",
    };
  } catch (error) {
    console.error("SheetPrivate update error: ", error);
    return {
      error: "Ошибка обновления приватного листа.",
    };
  }
};

export const removeSheet = async (sheetId, userId) => {
  noStore();

  const existingSheet = await getSheetById(sheetId);
  if (!existingSheet) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser || existingSheet.userId !== existingUser.id) {
    return {
      error: "Несанкционированный доступ!",
    };
  }

  try {
    const entries = await getEntriesBySheetId(existingSheet.id);

    await db.sheet.delete({
      where: {
        id: existingSheet.id,
      },
    });

    revalidatePath("/sheets");

    for (const e of entries) {
      if (e.imageStart) {
        console.log("Пытался удалить ", e.imageStart);
        deleteFile(e.imageStart);
        console.log("Удалил ", e.imageStart);
      }
      if (e.imageEnd) {
        console.log("Пытался удалить ", e.imageEnd);
        deleteFile(e.imageEnd);
        console.log("Удалил ", e.imageEnd);
      }
    }

    return {
      success: "Лист успешно удален!",
    };
  } catch (error) {
    console.error("Error deleting sheet: ", error);
    return {
      error: "Ошибка удаления листа!",
    };
  }
};
