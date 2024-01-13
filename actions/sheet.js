"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { SheetSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getSheetsByUserId } from "@/data/sheet";

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

export const createSheet = async (values) => {
    const validatedFields = SheetSchema.safeParse(values);

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
