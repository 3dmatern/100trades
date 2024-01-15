"use client";

import { FaUser } from "react-icons/fa";
import { FaceIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logoutButton";
import Link from "next/link";

export function UserButton() {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <Link href="/profile" className="block md:hidden">
                    <DropdownMenuItem>
                        <FaceIcon className="w-4 h-4 mr-2" /> Профиль
                    </DropdownMenuItem>
                </Link>
                <Link href="/settings" className="block md:hidden">
                    <DropdownMenuItem>
                        <GearIcon className="w-4 h-4 mr-2" /> Настройки
                    </DropdownMenuItem>
                </Link>
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="w-4 h-4 mr-2" /> Выйти
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
