import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllResult = async () => {
    noStore();
    try {
        const allResults = await db.result.findMany();

        return allResults;
    } catch (error) {
        return null;
    }
};
