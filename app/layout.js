import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["cyrillic", "latin"] });

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
                <body className={cn("min-w-96", inter.className)}>
                    <Toaster />
                    {children}
                    <div id="modals" />
                    <a
                        href="https://winloss.ru"
                        target="_blank"
                        className="block py-1 text-center text-slate-500 text-sm absolute bottom-0 left-1/2 -translate-x-1/2"
                    >
                        © Школа Трейдинга Хомяка-Спекулянта, winloss.ru
                    </a>
                </body>
            </html>
        </SessionProvider>
    );
}
