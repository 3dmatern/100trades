import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getSheetsByUserId = async (userId) => {
    noStore();
    try {
        const sheets = await db.sheet.findMany({
            where: { userId },
            orderBy: {
                date: "asc",
            },
        });

        return sheets;
    } catch (error) {
        return null;
    }
};

export const getSheetById = async (sheetId) => {
    noStore();
    try {
        const sheet = await db.sheet.findUnique({
            where: {
                id: sheetId,
            },
        });

        return sheet;
    } catch (error) {
        return null;
    }
};

export const getSheetNameById = async (sheetId) => {
    noStore();
    try {
        const sheetName = await db.sheet.findUnique({
            where: {
                id: sheetId,
            },
            select: {
                name: true,
            },
        });

        return sheetName.name;
    } catch (error) {
        return null;
    }
};
