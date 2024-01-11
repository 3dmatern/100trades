import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchSheetsByUserId(userId) {
    // Добавьте сюда noStore(), чтобы предотвратить кэширование ответа.
    // Это эквивалентно in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
        const data = await sql`SELECT * FROM sheets WHERE user_id = ${userId};`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить данные листы.");
    }
}

export async function fetchEntriesBySheetId(sheetId) {
    noStore();
    try {
        const data =
            await sql`SELECT * FROM entries WHERE sheet_id = ${sheetId};`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить данные записи.");
    }
}

export async function fetchTags() {
    noStore();
    try {
        const data = await sql`SELECT * FROM tags`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить данные теги.");
    }
}

export async function fetchTagsByEntryId(entryId) {
    noStore();
    try {
        const data =
            await sql`SELECT * FROM entry_tag WHERE entry_id = ${entryId};`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить данные теги.");
    }
}

export async function fetchResults() {
    try {
        const data = await sql`SELECT * FROM results`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить данные результаты сделок.");
    }
}

export async function fetchRiskRewards() {
    try {
        const data = await sql`SELECT * FROM risk_rewards`;
        return data.rows;
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить risk/rewards.");
    }
}

export async function getUser(email) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error("Ошибка базы данных:", error);
        throw new Error("Не удалось получить пользователя.");
    }
}
