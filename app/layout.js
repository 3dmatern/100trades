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
        <body className={cn("", inter.className)}>
          <Toaster />
          <div className="min-w-96 min-h-screen pb-12">
            {children}
          </div>
          <div id="modals" />
          <footer
            className="
              block fixed right-0 bottom-0 left-0 py-3 text-center
              z-[9999] bg-white
            "
          >
            <a
              href="https://winloss.ru"
              target="_blank"
              className="text-slate-500 text-sm"
            >
              © Школа Трейдинга Хомяка-Спекулянта, winloss.ru
            </a>
          </footer>

          <script src="//code.jivo.ru/widget/tc14zDvdJw" async></script>
        </body>
      </html>
    </SessionProvider>
  );
}
