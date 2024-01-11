"use server";

import { LoginSchema } from "@/schemas";

export const login = async (values) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Заполните поля!",
        };
    }

    return { success: "Письмо отправлено!" };
};
