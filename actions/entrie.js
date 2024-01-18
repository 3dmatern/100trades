"use server";

import { unstable_noStore as noStore } from "next/cache";

import { db } from "@/lib/db";
import { EntrieSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetById } from "@/data/sheet";
import { getEntrieById, getEntriesBySheetId } from "@/data/entrie";

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
            data: { sheetId: existingSheet.id },
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
        const entries = getEntriesBySheetId(existingSheet.id);

        return entries;
    } catch (error) {
        console.error("Error receiving entries: ", error);
        return {
            error: "Ошибка получения записей!",
        };
    }
};

export const updateEntrie = async ({ userId, values }) => {
    noStore();
    const validatedFields = EntrieSchema.safeParse(values);
    if (!validatedFields) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const {
        id,
        sheetId,
        name,
        pose,
        risk,
        profit,
        entryDate,
        imageStart,
        deposit,
        exitDate,
        imageEnd,
        stress,
        notes,
        resultId,
        rrId,
        entrieTag,
    } = validatedFields.data;

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
                imageStart: imageStart || null,
                deposit: deposit === "" ? null : deposit || undefined,
                exitDate: exitDate === "" ? null : exitDate || undefined,
                imageEnd: imageEnd || null,
                stress: stress || undefined,
                notes: notes === "" ? null : notes || undefined,
                resultId: resultId || undefined,
                rrId: rrId || undefined,
                entrieTag: entrieTag || undefined,
            },
        });

        return {
            updatedEntrie,
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
        const { id } = await db.entrie.delete({
            where: { id: existingEntrie.id },
        });

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
