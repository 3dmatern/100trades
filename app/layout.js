import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
    title: "Журнал сделок",
    description: "Журнал сделок трейдинга Homa-Trading",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
