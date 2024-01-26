import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
    title: "Журнал Cделок",
    description: "Журнал Cделок трейдинга Homa-Trading",
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
    alternates: {
        canonical: "/",
    },
};

export default async function RootLayout({ children }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="ru">
                <body className={inter.className}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
