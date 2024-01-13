"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/paswordResetToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";

export const newPassword = async (values, token) => {
    if (!token) {
        return {
            error: "Отсутствует токен!",
        };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Введите пароль!",
        };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Неверный токен!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Токен устарел!",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "Email не существует!",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Пароль обновлен!",
    };
};
