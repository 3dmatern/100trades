import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getEntrieTagsByEntrieId = async (entrieId) => {
    noStore();
    try {
        const entrieTags = await db.entrieTag.findMany({
            where: {
                entrieId,
            },
        });

        return entrieTags;
    } catch (error) {
        return null;
    }
};
