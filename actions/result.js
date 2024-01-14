"use server";

import { revalidatePath } from "next/cache";

import { getAllResult } from "@/data/result";

export const getResults = async () => {
    try {
        const results = await getAllResult();

        revalidatePath("/sheets");

        return results;
    } catch (error) {
        console.error("Error receiving results: ", error);
        return {
            error: "Ошибка получения WIN-LOSS!",
        };
    }
};
