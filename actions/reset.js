"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { sendPasswordResetEmailSMTP } from "@/lib/mailRUSMTP";

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

    await sendPasswordResetEmailSMTP(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Письмо для сброса отправлено на почту!" };
};
