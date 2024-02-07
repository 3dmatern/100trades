import { db } from "@/lib/db";

export const getUserByEmail = async (email) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserNickById = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select: {
                nickname: true,
            },
        });

        return user.nickname;
    } catch (error) {
        return null;
    }
};
