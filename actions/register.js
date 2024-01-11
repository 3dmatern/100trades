"use server";

import { db } from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

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
    const activationToken = uuidv4();

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    // TODO: Send verefication token email

    // return { success: "Письмо отправлено! Проверьте почту." };
    return { success: "Пользователь создан!" };
};
