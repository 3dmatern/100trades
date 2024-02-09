"use server";

import { getAllUsers, getUserById } from "@/data/user";

export const getUsers = async ({ id, role }) => {
    const existingUser = await getUserById(id);
    if (!existingUser) {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    if (existingUser.role !== "ADMIN" || role !== "ADMIN") {
        return {
            error: "Несанкционированный доступ!",
        };
    }

    try {
        const users = await getAllUsers();

        return users;
    } catch (error) {
        console.error("Error receiving users: ", error);
        return {
            error: "Ошибка получения пользователей!",
        };
    }
};
