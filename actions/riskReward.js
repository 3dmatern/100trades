"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { RiskRewardSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { getAllRiskReward } from "@/data/riskReward";

export const createRiskReward = async ({ userId, values }) => {
    noStore();
    const validatedFields = RiskRewardSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Введите значение!",
        };
    }
    const { label, value } = validatedFields.data;

    const existingUser = await getUserById(userId);
    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const newRR = await db.riskReward.create({
            data: {
                label,
                value,
            },
        });

        revalidatePath("/sheets");

        return {
            newRR,
            success: "R:R успешно создан!",
        };
    } catch (error) {
        console.error("Error creating riskReward: ", error);
        return {
            error: "Ошибка создания R:R!",
        };
    }
};

export const getRisksRewards = async () => {
    noStore();
    try {
        const rr = getAllRiskReward();

        revalidatePath("/sheets");

        return rr;
    } catch (error) {
        console.error("Error receiving riskReward: ", error);
        return {
            error: "Ошибка получения R:R!",
        };
    }
};
