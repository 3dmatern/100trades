"use client";

import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { activateAccount } from "@/lib/actions";

export default function TokenPage() {
    const { token } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (token) {
            const activateUser = async () => {
                const result = await activateAccount(token);
                setResult(result);
            };

            activateUser();
        } else {
            redirect("/");
        }
    }, [token]);

    return (
        <div>
            {result === null ? (
                "Загрузка..."
            ) : result ? (
                <>
                    <h1 className="text-xl">
                        Ваш аккаунт успешно активирован!
                    </h1>
                    <Link
                        href="/profile"
                        className="block w-max mt-3 mx-auto py-1 px-2 bg-sky-600 hover:bg-sky-400 rounded-md text-white"
                    >
                        Перейти в личный кабинет
                    </Link>
                </>
            ) : (
                <>
                    <h1 className="text-xl text-red-700">
                        Ошибка активации аккаунта! Свяжитесь с нами.
                    </h1>
                    <Link
                        href="/"
                        className="block w-max mt-3 mx-auto py-1 px-2 bg-sky-600 hover:bg-sky-400 rounded-md text-white"
                    >
                        Перейти на главную
                    </Link>
                </>
            )}
        </div>
    );
}
