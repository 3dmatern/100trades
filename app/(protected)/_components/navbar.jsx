"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/userButton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Logo } from "@/components/logo";

export default function Navbar() {
  const pathname = usePathname();
  const user = useCurrentUser();
  return (
    <nav
      className="
        min-w-96 absolute top-0 right-0 left-0
        flex items-center justify-between w-full p-4 bg-secondary shadow-sm
      "
    >
      <Link href="/">        
        <Logo />
      </Link>

      <div className="flex items-center justify-center gap-x-2">
        <Button
          variant={pathname === "/sheets" ? "default" : "outline"}
          asChild
        >
          <Link href="/sheets">Листы</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/profile" ? "default" : "outline"}
          className="md:block hidden"
        >
          <Link href="/profile">Профиль</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
          className="md:block hidden"
        >
          <Link href="/settings">Настройки профиля</Link>
        </Button>
        {user?.role === "ADMIN" && (
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
            className="md:block hidden"
          >
            <Link href="/admin">Админка</Link>
          </Button>
        )}
      </div>

      <UserButton />
    </nav>
  );
}
