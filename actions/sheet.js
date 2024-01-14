"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetCreateSchema, SheetUpdateSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetBySheetId, getSheetsByUserId } from "@/data/sheet";

export const createSheet = async (values) => {
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
        await db.sheet.create({
            data: {
                userId,
                name,
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

export const updateSheet = async (values) => {
    const validatedFields = SheetUpdateSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const { id, userId, name } = validatedFields.data;

    const existingSheet = await getSheetBySheetId(id);

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

        revalidatePath("/deals");
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

export const removeSheet = async ({ sheetId, userId }) => {
    const existingSheet = await getSheetBySheetId(sheetId);

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

        revalidatePath("/deals");

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
