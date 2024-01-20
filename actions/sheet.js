"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetCreateSchema, SheetUpdateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetById, getSheetsByUserId } from "@/data/sheet";

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
        await db.sheet.update({
            where: {
                id: existingSheet.id,
            },
            data: {
                name,
            },
        });

        return {
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
        await db.sheet.delete({
            where: {
                id: existingSheet.id,
            },
        });

        revalidatePath("/sheets");

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
