import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
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
                <body className={inter.className}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
