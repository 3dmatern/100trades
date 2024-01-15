import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEntrieTagsByEntrieId = async (entrieId) => {
    noStore();
    try {
        const entrieTags = await db.entrieTag.findMany({
            where: {
                entrieId,
            },
            orderBy: {
                date: "asc",
            },
        });

        return entrieTags;
    } catch (error) {
        return null;
    }
};

export const getEntrieTagByEntrieIdTagId = async ({ entrieId, tagId }) => {
    noStore();
    try {
        const entrieTag = await db.entrieTag.findFirst({
            where: {
                entrieId,
                tagId,
            },
            orderBy: {
                date: "asc",
            },
        });

        return entrieTag;
    } catch (error) {
        return null;
    }
};
