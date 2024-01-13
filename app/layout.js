import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
    title: "Журнал сделок",
    description: "Журнал сделок трейдинга Homa-Trading",
};

export default async function RootLayout({ children }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="ru">
                <body className={inter.className}>{children}</body>
            </html>
        </SessionProvider>
    );
}
