"use server";

import { getEntrieWithWL } from "@/data/entrie";

export const getDealsStatWLPeriod = async ({ winID, lossID }) => {
    try {
        const deals = await getEntrieWithWL({ winID, lossID });

        return deals;
    } catch (error) {
        console.error("Error receiving getDealsStatWLPeriod: ", error);

        return {
            error: "Ошибка получения getDealsStatWLPeriod",
        };
    }
};
