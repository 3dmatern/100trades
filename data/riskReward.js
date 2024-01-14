import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllRiskReward = async () => {
    noStore();
    try {
        const allRiskReward = await db.riskReward.findMany();

        return allRiskReward;
    } catch (error) {
        return null;
    }
};
