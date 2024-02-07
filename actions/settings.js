"use server";

import bcrypt from "bcryptjs";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const settings = async (values) => {
    const user = await currentUser();
    if (!user) {
        return { error: "Несанкционированный доступ!" };
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "Несанкционированный доступ!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        );

        if (!passwordsMatch) {
            return { error: "Некорректный пароль!" };
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    });

    update({
        user: {
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            nickname: updatedUser.nickname,
        },
    });

    revalidatePath("/profile");

    return { success: "Настройки сохранены!" };
};
