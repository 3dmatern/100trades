"use server";

import { db } from "@/lib/db";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

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

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Письмо для сброса отправлено на почту!" };
};
