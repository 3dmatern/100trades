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
        console.log("getSheetsByUserId -> sheets ", sheets);

        return sheets;
    } catch (error) {
        return null;
    }
};
