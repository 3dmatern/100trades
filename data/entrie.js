import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEntriesBySheetId = async (sheetId) => {
    noStore();
    try {
        const entries = await db.entrie.findMany({
            where: { sheetId },
            orderBy: {
                date: "desc",
            },
        });

        return entries;
    } catch (error) {
        return null;
    }
};

export const getEntriesBySheetIdByFields = async (sheetId, fields) => {
    noStore();
    try {
        const entries = await db.entrie.findMany({
            where: { sheetId },
            orderBy: {
                date: "desc",
            },
            select: {
                id: true,
                date: true,
                ...Object.values(fields).reduce((acc, field) => {
                    if (field) {
                        acc[field] = true;
                    }
                    return acc;
                }, {}),
            },
        });

        return entries;
    } catch (error) {
        return null;
    }
};

export const getEntrieById = async (entrieId) => {
    noStore();
    try {
        const entrie = await db.entrie.findUnique({
            where: { id: entrieId },
        });

        return entrie;
    } catch (error) {
        return null;
    }
};

export const getEntrieWithWL = async ({ winID, lossID }) => {
    try {
        const entrie = await db.entrie.findMany({
            where: {
                OR: [
                    {
                        resultId: {
                            contains: winID,
                        },
                    },
                    {
                        resultId: {
                            contains: lossID,
                        },
                    },
                ],
            },
            select: {
                entryDate: true,
                exitDate: true,
                resultId: true,
            },
        });

        return entrie;
    } catch (error) {
        return null;
    }
};
