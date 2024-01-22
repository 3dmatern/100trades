import Head from "next/head";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

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
                <Head>
                    <meta
                        name="yandex-verification"
                        content="2b4255513bea4b51"
                    />
                </Head>
                <body className={inter.className}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
