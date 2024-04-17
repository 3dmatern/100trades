import { db } from "@/lib/db";

export const getSheetPrivateById = async (sheetId) => {
    try {
        const sheet = await db.sheetPrivate.findUnique({
            where: { id: sheetId },
        });

        return sheet;
    } catch (error) {
        return null;
    }
};
