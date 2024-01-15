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
