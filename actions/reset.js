"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetBegetSMTP } from "@/lib/mailBegetSMTP";

export const reset = async (values) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Неправильный email!",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "Email не существует!",
        };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    const response = await sendPasswordResetBegetSMTP(
        passwordResetToken.email,
        passwordResetToken.token
    );

    if (response) {
        return response;
    }

    return {
        error: "Что-то пошло не так!",
    };
};
