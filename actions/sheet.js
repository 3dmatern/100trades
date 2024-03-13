"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetCreateSchema, SheetUpdateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import {
    getSheetById,
    getSheetsByUserId,
    getSheetsWithEntrieWLByUserId,
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
        const sheets = getSheetsByUserId(existingUser.id);

        return sheets;
    } catch (error) {
        console.error("Error receiving sheets: ", error);
        return {
            error: "Ошибка получения листов!",
        };
    }
};

export const getSheetsWithEntrieWL = async (userId) => {
    noStore();
    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return {
            redirect: "/",
        };
    }

    try {
        let entries = [];
        const sheets = await getSheetsWithEntrieWLByUserId(existingUser.id);

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
