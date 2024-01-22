import { BackButton } from "@/components/auth/backButton";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-full flex items-center justify-center flex-col space-y-4">
            <h2 className="text-3xl font-semibold">404 | Not Found</h2>
            <p>Не удалось найти запрошенный ресурс</p>
            <BackButton href={"/"} label="Вернуться на главную" />
        </div>
    );
}
