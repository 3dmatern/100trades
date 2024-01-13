"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetCreateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import {
    getSheetBySheetId,
    getSheetsByUserId,
    removeSheetBySheetId,
} from "@/data/sheet";

export const createSheet = async (values) => {
    const validatedFields = SheetCreateSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const { userId, name, date } = validatedFields.data;

    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        await db.sheet.create({
            data: {
                userId,
                name,
                date,
            },
        });

        revalidatePath("/deals");
        return {
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
    const existingUser = await getUserById(userId);

    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const sheets = getSheetsByUserId(existingUser.id);

        revalidatePath("/deals");

        return sheets;
    } catch (error) {
        console.error("Error receiving sheets: ", error);
        return {
            error: "Ошибка получения листов!",
        };
    }
};

export const removeSheet = async ({ sheetId, userId }) => {
    const existingSheet = await getSheetBySheetId(sheetId);

    if (!existingSheet) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingUser = await getUserById(userId);

    if (!existingUser || existingSheet.userId !== existingUser.id) {
        console.log({ sheetId, userId });
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const sheets = await removeSheetBySheetId(existingSheet.id);
        revalidatePath("/deals");

        return sheets;
    } catch (error) {
        console.error("Error deleting sheet: ", error);
        return {
            error: "Ошибка удаления листа!",
        };
    }
};
