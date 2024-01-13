"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/userButton";
import { LogoutButton } from "@/components/auth/logoutButton";

export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between w-full p-4 bg-secondary shadow-sm">
            <Link href="/">
                <h1 className="text-2xl font-bold">Журнал сделок</h1>{" "}
            </Link>

            <div className="flex items-center justify-center gap-x-2">
                <Button
                    variant={pathname === "/deals" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/deals">Сделки</Link>
                </Button>
                <Button
                    variant={pathname === "/profile" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/profile">Профиль</Link>
                </Button>
                <Button
                    variant={pathname === "/settings" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/settings">Настройки профиля</Link>
                </Button>
                <p>loader saved...</p>
            </div>

            <UserButton />
        </nav>
    );
}
