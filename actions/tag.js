"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { TagSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getAllTag } from "@/data/tag";

export const createTag = async ({ userId, values }) => {
    noStore();
    const validatedFields = TagSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Введите значение!",
        };
    }
    const { label, value } = validatedFields.data;

    const existingUser = await getUserById(userId);
    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const newTag = await db.tag.create({
            data: {
                label,
                value,
            },
        });

        // revalidatePath("/sheets");

        return {
            newTag,
            success: "Тег успешно создан!",
        };
    } catch (error) {
        console.error("Error creating tag: ", error);
        return {
            error: "Ошибка создания тега!",
        };
    }
};

export const getTags = async () => {
    noStore();
    try {
        const tags = await getAllTag();

        // revalidatePath("/sheets");

        return tags;
    } catch (error) {
        console.error("Error receiving tags: ", error);
        return {
            error: "Ошибка получения тегов!",
        };
    }
};
