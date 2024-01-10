"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { signIn } from "@/auth";
import { sendMail } from "./sendMail";

const FormSchemaSheet = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
});
const CreateSheet = FormSchemaSheet.omit({ id: true });
const UpdateSheet = FormSchemaSheet.omit({ id: true });

const FormSchemaRiskReward = z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
});
const CreateRiskReward = FormSchemaRiskReward.omit({ id: true });

const FormSchemaTag = z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
});
const CreateTag = FormSchemaTag.omit({ id: true });

export async function createSheet(prevState, formData) {
    const validatedFields = CreateSheet.safeParse({
        name: formData.get("name"),
    });

    // Если проверка формы не удалась, возвращаем ошибку.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Введите название листа.",
        };
    }

    const { userId, name } = validatedFields.data;

    // Добавляем данные в БД
    try {
        await sql`
            INSERT INTO sheets (user_id, name)
            VALUES (${userId}, ${name})
        `;
    } catch (error) {
        console.error("DB error when creating sheet:", error);
        // Если возникает ошибка базы данных, возвращаем более конкретную ошибку.
        return {
            message: "Ошибка базы данных: не удалось создать лист.",
        };
    }

    // Повторно проверить кеш страницы и перенаправить пользователя.
    revalidatePath("/deals");
    redirect("/deals");
}
export async function updateSheet(prevState, formData) {
    const validatedFields = UpdateSheet.safeParse({
        id: formData.get("id"),
        userId: formData.get("userId"),
        name: formData.get("name"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Введите название листа.",
        };
    }

    const { id, name } = validatedFields.data;

    try {
        await sql`
            UPDATE sheets
            SET name = ${name}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error("DB error when updating sheet:", error);
        // Если возникает ошибка базы данных, возвращаем более конкретную ошибку.
        return {
            message: "Ошибка базы данных: не удалось обновить лист.",
        };
    }

    revalidatePath("/deals");
    redirect("/deals");
}

export async function createEntrie(sheetId) {
    if (!sheetId || sheetId === "") {
        return {
            errors: { status: ["Вы не выбрали лист"] },
            message: "Не удалось создать запись",
        };
    }

    try {
        await sql`
            INSERT INTO entries (sheet_id)
            VALUES (${sheetId})
        `;
    } catch (error) {
        console.error("DB error when creating entrie:", error);
        // Если возникает ошибка базы данных, возвращаем более конкретную ошибку.
        return {
            message: "Ошибка базы данных: не удалось создать запись.",
        };
    }

    revalidatePath("/deals");
    redirect("/deals");
}
function validatedEntrie(payload) {
    let result = {};
    const keys = Object.keys(payload);
    keys.forEach((key) => {
        if (typeof payload[key] === "string") {
            result = { ...result, key: payload[key].trim() };
        } else if (!payload[key]) {
            result = { ...result, key: payload[key] };
        }
    });

    return result;
}
export async function updateEntrie(payload) {
    const validatedFields = validatedEntrie(payload);
    if (!validatedFields.sheetId || validatedFields.sheetId === "") {
        return {
            errors: { status: ["Вы не выбрали лист"] },
            message: "Не удалось обновить запись",
        };
    }

    const { id } = validatedFields;

    Object.keys(payload).forEach(async (key) => {
        if (payload[key] !== "" || payload[key] !== null) {
            try {
                await sql`
                    UPDATE entries
                    SET ${key} = ${payload[key]}
                    WHERE id = ${id}
                `;
            } catch (error) {
                console.error("DB error when updating entrie:", error);
                // Если возникает ошибка базы данных, возвращаем более конкретную ошибку.
                return {
                    message: "Ошибка базы данных: не удалось обновить запись.",
                };
            }
        }
    });

    revalidatePath("/deals");
    redirect("/deals");
}

export async function createRiskReward(payload) {
    const validatedFields = CreateRiskReward.safeParse({
        label: payload.label,
        value: payload.value,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Введите значение.",
        };
    }

    const { label, value } = validatedFields.data;

    try {
        await sql`
            INSERT INTO risks_rewards (label, value)
            VALUES (${label}, ${value})
        `;
    } catch (error) {
        console.error("DB error when creating risk/reward:", error);
        return {
            message: "Ошибка базы данных: не удалось создать risk/reward",
        };
    }
}

export async function createTag(payload) {
    const validatedFields = CreateTag.safeParse({
        label: payload.label,
        value: payload.value,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Введите значение.",
        };
    }

    const { label, value } = validatedFields.data;

    try {
        await sql`
            INSERT INTO tags (label, value)
            VALUES (${label}, ${value})
        `;
    } catch (error) {
        console.error("DB error when creating tag:", error);
        return {
            message: "Ошибка базы данных: не удалось создать тег",
        };
    }
}

export async function createEntrieTag(payload) {
    if (!payload.entrieId || !payload.tagId) {
        return {
            errors: { status: ["Вы не выбрали запись или тег"] },
            message: "Выберите запись и тег к ней.",
        };
    }

    const { entrieId, tagId } = payload;

    try {
        await sql`
            INSERT INTO entrie_tag (entrie_id, tag_id)
            VALUES (${entrieId}, ${tagId})
        `;
    } catch (error) {
        console.error("DB error when creating entrie_tag:", error);
        return {
            message:
                "Ошибка базы данных: не удалось создать связь тега с записью",
        };
    }
}

export async function registration(prevState, formData) {
    const validatedFields = z
        .object({
            email: z.string().email(),
        })
        .safeParse({ email: formData.get("email") });

    if (!validatedFields.success) {
        return { message: "Введите корректный email." };
    }

    const { email } = validatedFields.data;
    const password = crypto.randomBytes(8).toString("hex"); // Генерация 16-символьного пароля
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const activationToken = uuidv4(); // Создайте уникальный токен активации

    try {
        const isUser = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        if (isUser.rowCount > 0) {
            return { message: "Пользователь с таким email уже существует." };
        }

        await sql`
            INSERT INTO users (email, password)
            VALUES (${email}, ${passwordHash})
        `;

        const user = await sql`
            SELECT email, password FROM users WHERE email = ${email}
        `;

        if (user.rows[0]) {
            sendMail(
                '"Next js" <nodejs@example.com>',
                email,
                "Сообщение от Журнала сделок",
                "Это сообщение было отправлено с приложения Next js.",
                `Активировать аккакунт: <a href='https://homa-trading.vercel.app/activate/${activationToken}'>ссылка</a><br />Ваш пароль для входа: <strong>${password}</strong>`
            );
            await sql`
                INSERT INTO activation_tokens (user_id, token)
                VALUES (${user.rows[0].id}, ${activationToken})
            `;
            console.log(
                `Активировать аккакунт: https://homa-trading.vercel.app/activate/${activationToken} Ваш пароль для входа: ${password}`
            );
            await signIn("credentials", {
                email: user.rows[0].email,
                password,
            });
        }
    } catch (error) {
        console.error("DB error when creating user:", error);
        return {
            message: "Ошибка базы данных: не удалось создать пользователя",
        };
    }
}

export async function authenticate(prevState, formData) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Неверные учетные данные" };
                default:
                    return { message: "Что-то пошло не так." };
            }
        }
        throw error;
    }
}

export async function activateAccount(token) {
    try {
        const trimToken = token.trim().toString();

        const searchToken = await sql`
            SELECT * FROM activation_tokens WHERE token = ${trimToken};
        `;

        if (searchToken.rows[0]) {
            await sql`
                UPDATE users
                SET verified_email = true
                WHERE id = ${searchToken.rows[0].user_id};
            `;
            await sql`
                DELETE FROM activation_tokens WHERE token = ${trimToken}
            `;

            return true;
        }
        return false;
    } catch (error) {
        console.error("DB error when activate user:", error);
        return {
            message: "Ошибка базы данных: не удалось активировать пользователя",
        };
    }
}
