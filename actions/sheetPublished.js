"use server";

import { db } from "@/lib/db";
import { getEntriesBySheetIdByFields } from "@/data/entrie";
import { getSheetById, getSheetNameById } from "@/data/sheet";
import { getSheetPublishedBySheetId } from "@/data/sheetPublished";
import { getUserById, getUserNickById } from "@/data/user";

export const createSheetPublished = async ({ userId, sheetId, items }) => {
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
        const newSheetPublished = await db.sheetPublished.create({
            data: {
                userId: existingUser.id,
                sheetId: existingSheet.id,
                ...items,
            },
        });

        return {
            newSheetPublished,
            success: "Лист успешно опубликован.",
        };
    } catch (error) {
        console.log("Error creating sheetPublished: ", error);
        return {
            error: "Ошибка публикации листа.",
        };
    }
};

export const getSheetPublished = async (sheetPublishedId) => {
    const existingSheetPublished = await getSheetPublishedBySheetId(
        sheetPublishedId
    );
    if (!existingSheetPublished) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const { id, userId, sheetId, ...rest } = existingSheetPublished;
    try {
        const userNick = await getUserNickById(userId);
        const sheetName = await getSheetNameById(sheetId);
        const entrieFields = await getEntriesBySheetIdByFields(sheetId, rest);

        return {
            userNick,
            sheetName,
            deals: entrieFields,
        };
    } catch (error) {
        console.error("Error receiving sheetPublished: ", error);
        return {
            error: "Ошибка получения публичного листа!",
        };
    }
};

export const updateSheetPublished = async (payload) => {};

export const deleteSheetPublished = async (id) => {};
