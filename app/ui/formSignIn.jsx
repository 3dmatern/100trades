"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import InputField from "./common/inputField";
import Button from "./common/button";

const initData = {
    email: "",
    password: "",
};

export default function FormSignIn() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [data, setData] = useState(initData);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    return (
        <form action={dispatch} className="max-w-80 w-full">
            <span className="block text-center text-gray-700 text-xl mb-7">
                Авторизация
            </span>
            <InputField
                label="Введите Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
            <InputField
                label="Введите пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />

            {!!errorMessage?.message && (
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">
                            {errorMessage.message}
                        </p>
                    </>
                </div>
            )}

            <LoginButton />
            {/* <Button className="mt-5" name="Войти" /> */}

            <p className="mt-5 text-gray-700 text-center">
                Не аккаунта?{" "}
                <Link
                    href="/registration"
                    className="text-sky-700 hover:text-sky-500 hover:underline"
                >
                    Зарегистрироваться
                </Link>
            </p>
        </form>
    );
}

function LoginButton({ disabled }) {
    const { pending } = useFormStatus();

    return (
        <Button
            className="mt-5 w-max"
            disabled={disabled}
            aria-disabled={pending}
        >
            Войти
        </Button>
    );
}
