import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTag = async (skip, take) => {
    noStore();
    let allTags = [];

    try {
        if (skip && take) {
            allTags = await db.tag.findMany({
                skip,
                take,
                include: {
                    entrieTag: {
                        include: {
                            id: true,
                        },
                    },
                },
            });
        } else {
            allTags = await db.tag.findMany();
        }

        return allTags;
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

export const getIDs = async (skip, take) => {
    try {
        const ids = await db.tag.findMany({
            skip,
            take,
            select: {
                id: true,
            },
        });

        return ids.map((item) => item.id);
    } catch (error) {
        return null;
    }
};

export const getByIDs = async (ids) => {
    try {
        const tags = await db.tag.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return tags;
    } catch (error) {
        return null;
    }
};

export const removeByIDs = async (ids) => {
        console.log(ids);
    try {
        await db.entrieTag.deleteMany({
            where: {
                tagId: {
                    in: ids,
                },
            },
        });
        const removedTags = await db.tag.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return removedTags;
    } catch (error) {
        return null;
    }
};