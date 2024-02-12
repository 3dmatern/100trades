import { db } from "@/lib/db";

export const getAllLongShort = async () => {
    try {
        const allLongs = await db.longShort.findMany();

        return allLongs;
    } catch (error) {
        return null;
    }
};
