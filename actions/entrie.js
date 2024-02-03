"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { EntrieSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetById } from "@/data/sheet";
import { getEntrieById, getEntriesBySheetId } from "@/data/entrie";
import { deleteFile } from "./files";
import { areTwoWorkdaysPassed } from "@/utils/areTwoWorkdaysPassed";
import { areWorkhoursPassed } from "@/utils/areWorkhoursPassed";

const daysToPass = 2;

export const createEntrie = async ({ userId, sheetId }) => {
    noStore();
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

    try {
        const newEntrie = await db.entrie.create({
            data: { sheetId: existingSheet.id, take: "Рано" },
        });

        return {
            newEntrie,
            success: "Запись успешно создана!",
        };
    } catch (error) {
        console.error("Error creating entrie: ", error);
        return {
            error: "Ошибка создания записи!",
        };
    }
};

export const getEntries = async (sheetId) => {
    noStore();
    const existingSheet = await getSheetById(sheetId);

    if (!existingSheet) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const entries = await getEntriesBySheetId(existingSheet.id);

        for (const entrie of entries) {
            if (
                entrie &&
                entrie.entryDate &&
                entrie.exitDate &&
                !entrie.imageEnd
            ) {
                const passedDays = areTwoWorkdaysPassed(entrie.exitDate);
                const isPassedTwoDays = passedDays >= daysToPass;

                if (isPassedTwoDays) {
                    entrie.take = "Сделай скрин";
                } else {
                    entrie.take = "Рано";
                }
            }
        }

        return entries;
    } catch (error) {
        console.error("Error receiving entries: ", error);
        return {
            error: "Ошибка получения записей!",
        };
    }
};

export const updateEntrie = async (userId, values) => {
    noStore();
    const validatedFields = EntrieSchema.safeParse(values);
    if (!validatedFields) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    let {
        id,
        sheetId,
        name,
        pose,
        risk,
        profit,
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
        rrId,
        entrieTag,
    } = validatedFields.data;

    const existingEntrie = await getEntrieById(id);
    if (!existingEntrie) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    if (
        (existingEntrie.entryDate && exitDate) ||
        (existingEntrie.entryDate && existingEntrie.exitDate && !imageEnd)
    ) {
        const passedDays = areTwoWorkdaysPassed(
            exitDate || existingEntrie.exitDate
        );
        const isPassedTwoDays = passedDays >= daysToPass;
        const time = areWorkhoursPassed(existingEntrie.entryDate, exitDate);

        if (isPassedTwoDays) {
            take = "Сделай скрин";
        } else {
            take = "Рано";
        }

        if (time) {
            timeInTrade = `${time}`;
        }
    } else if (existingEntrie.entryDate && !exitDate) {
        timeInTrade = "";
    }

    const existingSheet = await getSheetById(sheetId);
    if (!existingSheet) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingUser = await getUserById(userId);
    if (!existingUser || existingUser.id !== existingSheet.userId) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const updatedEntrie = await db.entrie.update({
            where: { id },
            data: {
                sheetId: existingSheet.id,
                name: name === "" ? null : name || undefined,
                pose: pose === "" ? null : pose || undefined,
                risk: risk === "" ? null : risk || undefined,
                profit: profit === "" ? null : profit || undefined,
                entryDate: entryDate === "" ? null : entryDate || undefined,
                imageStart: imageStart === "" ? null : imageStart || undefined,
                deposit: deposit === "" ? null : deposit || undefined,
                progress: progress === "" ? null : progress || undefined,
                exitDate: exitDate === "" ? null : exitDate || undefined,
                imageEnd: imageEnd === "" ? null : imageEnd || undefined,
                take: take === "" ? null : take || undefined,
                stress: stress || undefined,
                notes: notes === "" ? null : notes || undefined,
                timeInTrade:
                    timeInTrade === "" ? null : timeInTrade || undefined,
                resultId: resultId || undefined,
                rrId: rrId || undefined,
                entrieTag: entrieTag || undefined,
            },
        });

        revalidatePath(`/sheets/${updatedEntrie.id}`);

        return {
            payload: updatedEntrie,
            success: "Запись успешно обновлена!",
        };
    } catch (error) {
        console.error("Entrie update error: ", error);
        return {
            error: "Ошибка обновления записи!",
        };
    }
};

export const removeEntrie = async ({ userId, sheetId, entrieId }) => {
    noStore();
    const existingSheet = await getSheetById(sheetId);
    if (!existingSheet) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingUser = await getUserById(userId);
    if (!existingUser || existingUser.id !== existingSheet.userId) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingEntrie = await getEntrieById(entrieId);
    if (!existingEntrie || existingEntrie.sheetId !== existingSheet.id) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const { id, imageStart, imageEnd } = await db.entrie.delete({
            where: { id: existingEntrie.id },
        });

        if (imageStart) {
            console.log("Пытался удалить ", imageStart);
            deleteFile(imageStart);
            console.log("Удалил ", imageStart);
        }
        if (imageEnd) {
            console.log("Пытался удалить ", imageEnd);
            deleteFile(imageEnd);
            console.log("Удалил ", imageEnd);
        }

        return {
            id,
            success: "Запись успешно удалена!",
        };
    } catch (error) {
        console.error("Error deleting entrie: ", error);
        return {
            error: "Ошибка удаления записи!",
        };
    }
};
