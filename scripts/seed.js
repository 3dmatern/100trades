const { db } = require("@vercel/postgres");
const { results } = require("../app/lib/placeholder-data.js");

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                firstname VARCHAR(255),
                lastname VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `;
        console.log('Создана таблица "users"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления users:", error);
        throw error;
    }
}

async function seedSheets(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS sheets (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(255)
            );
        `;
        console.log('Создана таблица "sheets"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления sheets:", error);
        throw error;
    }
}

async function seedResults(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS results (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                label VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL
            );
        `;
        console.log('Создана таблица "results"');

        // Добавляем дефолтные значения
        const insertedResults = await Promise.all(
            results.map(
                async (result) => client.sql`
                INSERT INTO results (label, value, type)
                VALUES (${result.label}, ${result.value}, ${result.type})
                ON CONFLICT (id) DO NOTHING;
            `
            )
        );
        console.log(`Добавленых результатов ${insertedResults.length}`);

        return { createTable, results: insertedResults };
    } catch (error) {
        console.error("Ошибка добавления results:", error);
        throw error;
    }
}

async function seedRisksRewards(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS risks_rewards (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                label VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL
            );
        `;
        console.log('Создана таблица "risks_rewards"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления risks_rewards:", error);
        throw error;
    }
}

async function seedTags(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tags (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                label VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL
            );
        `;
        console.log('Создана таблица "tags"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления tags:", error);
        throw error;
    }
}

async function seedEntries(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS entries (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                sheet_id UUID REFERENCES sheets(id) ON DELETE CASCADE,
                name VARCHAR(255),
                result_id UUID REFERENCES results(id) ON DELETE SET NULL,
                pose VARCHAR(255),
                risk VARCHAR(255),
                profit VARCHAR(255),
                rr UUID REFERENCES risks_rewards(id) ON DELETE SET NULL DEFAULT null,
                entry_date DATE,
                image_start VARCHAR(255) DEFAULT null,
                deposit VARCHAR(255),
                exit_date DATE,
                image_end VARCHAR(255) DEFAULT null,
                stress VARCHAR(255),
                notes TEXT
            );
        `;
        console.log('Создана таблица "entries"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления entries:", error);
        throw error;
    }
}

async function seedEntryTag(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS entry_tag (
                entry_id UUID REFERENCES entries(id) ON DELETE CASCADE,
                tag_id UUID REFERENCES tags(id) ON DELETE SET NULL,
                PRIMARY KEY (entry_id, tag_id)
            );
        `;
        console.log('Создана таблица "entry_tag"');

        return { createTable };
    } catch (error) {
        console.error("Ошибка добавления entry_tag:", error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedSheets(client);
    await seedResults(client);
    await seedRisksRewards(client);
    await seedTags(client);
    await seedEntries(client);
    await seedEntryTag(client);

    await client.end();
}

main().catch((err) => {
    console.error("Произошла ошибка при попытке заполнить базу данных:", err);
});
