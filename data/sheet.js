import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getSheetsByUserId = async (userId) => {
    noStore();
    try {
        const sheets = await db.sheet.findMany({
            where: {
                userId,
            },
        });

        return sheets;
    } catch (error) {
        return null;
    }
};

export const getSheetBySheetId = async (sheetId) => {
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

export const removeSheetBySheetId = async (sheetId) => {
    noStore();
    try {
        const sheet = await db.sheet.delete({
            where: {
                id: sheetId,
            },
        });
        console.log("remove ", sheet);

        return sheet;
    } catch (error) {
        return null;
    }
};
