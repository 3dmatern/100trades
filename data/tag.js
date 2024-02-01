import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTag = async () => {
    noStore();
    try {
        const allTag = await db.tag.findMany();

        return allTag;
    } catch (error) {
        return null;
    }
};

export const getTagByUserId = async (userId) => {
    noStore();
    try {
        const tags = await db.tag.findMany({
            where: {
                userId,
            },
        });

        return tags;
    } catch (error) {
        return null;
    }
};

export const getTagById = async (id) => {
    noStore();
    try {
        const tag = await db.tag.findUnique({
            where: {
                id,
            },
        });

        return tag;
    } catch (error) {
        return null;
    }
};

export const getTagByValue = async (value) => {
    noStore();
    try {
        const tag = await db.tag.findUnique({
            where: {
                value,
            },
        });

        return tag;
    } catch (error) {
        return null;
    }
};
