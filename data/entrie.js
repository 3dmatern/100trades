import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEntriesBySheetId = async (sheetId) => {
    noStore();
    try {
        const entries = await db.entrie.findMany({
            where: { sheetId },
            orderBy: {
                date: "asc",
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
                date: "asc",
            },
            select: {
                ...fields.reduce((acc, field) => {
                    acc[field] = true;
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
