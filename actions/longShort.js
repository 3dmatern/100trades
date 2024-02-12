"use server";

import { getAllLongShort } from "@/data/longShort";

export const getLongShorts = async () => {
    try {
        const longShorts = await getAllLongShort();

        return longShorts;
    } catch (error) {
        console.error("Error receiving longShorts: ", error);
        return {
            error: "Ошибка получения Long-Shorts!",
        };
    }
};
