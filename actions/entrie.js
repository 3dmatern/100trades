"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { EntrieCreateSchema, EntrieUpdateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetBySheetId } from "@/data/sheet";
import { getEntrieByEntrieId, getEntriesBySheetId } from "@/data/entrie";

export const createEntrie = async (values) => {
    const validatedFields = EntrieCreateSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const { userId } = validatedFields.data;

    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        await db.entrie.create({
            data: { userId },
        });

        revalidatePath("/deals");

        return {
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
    const existingSheet = await getSheetBySheetId(sheetId);

    if (!existingSheet) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const entries = getEntriesBySheetId(existingSheet.id);

        revalidatePath("/deals");

        return entries;
    } catch (error) {
        console.error("Error receiving entries: ", error);
        return {
            error: "Ошибка получения записей!",
        };
    }
};

export const updateEntrie = async ({ userId, values }) => {
    const validatedFields = EntrieUpdateSchema.safeParse(values);
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

    const existingSheet = await getSheetBySheetId(sheetId);
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
        await db.entrie.update({
            where: { id },
            data: {
                sheetId: existingSheet.id,
                name: name || undefined,
                pose: pose || undefined,
                risk: risk || undefined,
                profit: profit || undefined,
                entryDate: entryDate || undefined,
                imageStart: imageStart || undefined,
                deposit: deposit || undefined,
                exitDate: exitDate || undefined,
                imageEnd: imageEnd || undefined,
                stress: stress || undefined,
                notes: notes || undefined,
                resultId: resultId || undefined,
                rrId: rrId || undefined,
                entrieTag: entrieTag || undefined,
            },
        });

        revalidatePath("/deals");

        return {
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
    const existingSheet = await getSheetBySheetId(sheetId);
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

    const existingEntrie = await getEntrieByEntrieId(entrieId);
    if (!existingEntrie || existingEntrie.sheetId !== existingSheet.id) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        await db.entrie.delete({
            where: { id: existingEntrie.id },
        });

        revalidatePath("/deals");

        return {
            success: "Запись успешно удалена!",
        };
    } catch (error) {
        console.error("Error deleting entrie: ", error);
        return {
            error: "Ошибка удаления записи!",
        };
    }
};
