"use server";

import { db } from "@/lib/db";
import { getEntriesBySheetIdByFields } from "@/data/entrie";
import { getSheetById, getSheetNameById } from "@/data/sheet";
import { getSheetPublishedById } from "@/data/sheetPublished";
import { getUserById, getUserNickById } from "@/data/user";
import { getTagByUserId } from "@/data/tag";

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

    const itemsObject = items.reduce((acc, field) => {
        acc[field] = field;
        return acc;
    }, {});

    try {
        const newSheetPublished = await db.sheetPublished.create({
            data: {
                userId: existingUser.id,
                sheetId: existingSheet.id,
                ...itemsObject,
            },
        });

        return {
            newSheetPublished,
            success: "Лист успешно опубликован.",
        };
    } catch (error) {
        console.error("Error creating sheetPublished: ", error);
        return {
            error: "Ошибка публикации листа.",
        };
    }
};

export const getSheetPublished = async (sheetPublishedId) => {
    const existingSheetPublished = await getSheetPublishedById(
        sheetPublishedId
    );
    if (!existingSheetPublished) {
        return null;
    }

    const { id, userId, sheetId, date, ...rest } = existingSheetPublished;

    try {
        const userNick = await getUserNickById(userId);
        const tagsUser = await getTagByUserId(userId);
        const sheetName = await getSheetNameById(sheetId);
        const entrieFields = await getEntriesBySheetIdByFields(sheetId, rest);

        return {
            userNick,
            tagsUser,
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

export const getSheetPublishedBySheetId = async (sheetId) => {
    try {
        const sheetPublished = await db.sheetPublished.findUnique({
            where: { sheetId },
        });

        return sheetPublished;
    } catch (error) {
        console.error("Error receiving sheetPublished status: ", error);
        return {
            error: "Ошибка получения статуса листа!",
        };
    }
};

export const updateSheetPublished = async ({ userId, sheetId, items }) => {
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

    let {
        name,
        pose,
        risk,
        profit,
        entryDate,
        imageStart,
        deposit,
        progress,
        exitDate,
        imageEnd,
        take,
        stress,
        notes,
        timeInTrade,
        resultId,
        rrId,
        entrieTag,
    } = items.reduce((acc, field) => {
        acc[field] = field;
        return acc;
    }, {});

    try {
        const updSheetPublished = await db.sheetPublished.update({
            where: { sheetId: existingSheet.id },
            data: {
                userId: existingUser.id,
                sheetId: existingSheet.id,
                name: name || null,
                resultId: resultId || null,
                pose: pose || null,
                risk: risk || null,
                profit: profit || null,
                rrId: rrId || null,
                entryDate: entryDate || null,
                imageStart: imageStart || null,
                deposit: deposit || null,
                progress: progress || null,
                exitDate: exitDate || null,
                imageEnd: imageEnd || null,
                take: take || null,
                stress: stress || null,
                entrieTag: entrieTag || null,
                notes: notes || null,
                timeInTrade: timeInTrade || null,
            },
        });

        return {
            updSheetPublished,
            success: "Параметры публичности успешно обновлены.",
        };
    } catch (error) {
        console.error("SheetPublished update error: ", error);
        return {
            error: "Ошибка обновления публичного листа.",
        };
    }
};

export const deleteSheetPublished = async (id, userId) => {
    const existingSheetPublished = await getSheetPublishedById(id);
    if (!existingSheetPublished) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    const existingUser = await getUserById(userId);
    if (!existingUser || existingSheetPublished.userId !== existingUser.id) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        await db.sheetPublished.delete({
            where: { id: existingSheetPublished.id },
        });

        return {
            success: "Лист успешно удален из публикации!",
        };
    } catch (error) {
        console.error("Error deleting sheetPublished: ", error);
        return {
            error: "Ошибка удаления листа из публикации!",
        };
    }
};
