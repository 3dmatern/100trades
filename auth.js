import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user }) {
            const existingUser = await getUserById(user.id);

            // Запретить вход без подтверждения электронной почты
            if (!existingUser || !existingUser.emailVerified) {
                return false;
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.firstname = token.firstname;
                session.user.lastname = token.lastname;
                session.user.email = token.email;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return null;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return null;
            if (!existingUser.emailVerified) return null;

            // Получаем текущее время в секундах
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            // Проверяем, истек ли токен
            const isTokenExpired = token.exp <= currentTimeInSeconds;
            if (isTokenExpired) {
                return null;
            }

            token.firstname = existingUser.firstname;
            token.lastname = existingUser.lastname;
            token.email = existingUser.email;
            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
