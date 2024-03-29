"use server";

import { db } from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationBegetSMTP } from "@/lib/mailBegetSMTP";

export const register = async (values) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Заполните поля!",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            error: "Email уже используется!",
        };
    }

    const password = crypto.randomBytes(8).toString("hex"); // Генерация 16-символьного пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    const response = await sendVerificationBegetSMTP(
        verificationToken.email,
        verificationToken.token,
        password
    );

    if (response) {
        return response;
    }

    return {
        error: "Что-то пошло не так!",
    };
};
