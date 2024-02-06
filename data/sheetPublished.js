import { db } from "@/lib/db";

export const getSheetPublishedById = async (sheetPublishedId) => {
    try {
        const sheetPublished = await db.sheetPublished.findUnique({
            where: { id: sheetPublishedId },
        });

        return sheetPublished;
    } catch (error) {
        return null;
    }
};
