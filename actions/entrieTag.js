"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { EntrieTagSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getTagById } from "@/data/tag";
import { getEntrieById } from "@/data/entrie";
import {
    getEntrieTagByEntrieIdTagId,
    getEntrieTagsByEntrieId,
} from "@/data/entrieTag";

export const createEntrieTag = async ({ userId, values }) => {
    noStore();
    const validatedFields = EntrieTagSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Введите значение!",
        };
    }
    const { entrieId, tagId } = validatedFields.data;

    const existingEntrie = await getEntrieById(entrieId);
    if (!existingEntrie) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingTag = await getTagById(tagId);
    if (!existingTag) {
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
        const newEntrieTag = await db.entrieTag.create({
            data: {
                entrieId,
                tagId,
            },
        });

        // revalidatePath("/sheets");

        return {
            newEntrieTag,
            success: "Тег успешно добавлен!",
        };
    } catch (error) {
        console.error("Error creating entrieTag: ", error);
        return {
            error: "Ошибка добавления тега!",
        };
    }
};

export const getEntrieTags = async (entrieId) => {
    noStore();
    try {
        const entrieTags = await getEntrieTagsByEntrieId(entrieId);

        // revalidatePath("/sheets");

        return { entrieTags };
    } catch (error) {
        console.error("Error receiving entrieTags: ", error);
        return {
            error: "Ошибка получения тегов!",
        };
    }
};

export const removeEntrieTag = async ({ userId, entrieTag }) => {
    noStore();

    const existingEntrieTag = await getEntrieTagByEntrieIdTagId(entrieTag);
    if (!existingEntrieTag) {
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
        await db.entrieTag.delete({
            where: {
                id: existingEntrieTag.id,
                entrieId: existingEntrieTag.entrieId,
                tagId: existingEntrieTag.tagId,
            },
        });

        return {
            success: "Тег успешно удален!",
        };
    } catch (error) {
        console.error("Error deleting entrieTag: ", error);
        return {
            error: "Ошибка удаления тега!",
        };
    }
};
