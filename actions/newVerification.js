"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const newVerification = async (tokenWithPass) => {
    const [token, password] = tokenWithPass.split(".");
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Токен активации не существует!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Токен активации устарел!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "Email не существует!",
        };
    }

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    await signIn("credentials", {
        email: existingUser.email,
        password: password,
        redirectTo: DEFAULT_LOGIN_REDIRECT
    });
};
