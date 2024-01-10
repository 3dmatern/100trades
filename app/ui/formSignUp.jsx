"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { registration } from "../lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import InputField from "./common/inputField";
import Button from "./common/button";

export default function FormSignUp() {
    const [errorMessage, dispatch] = useFormState(registration, undefined);
    const [email, setEmail] = useState("");

    const handleChange = ({ target }) => {
        setEmail(target.value);
    };

    return (
        <form action={dispatch} className="max-w-80 w-full">
            <span className="block text-center text-gray-700 text-xl mb-7">
                Регистрация
            </span>
            <InputField
                label="Введите Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
            />

            {!!errorMessage?.message && (
                <div
                    className="flex h-8 items-center justify-center space-x-1"
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

            <RegistrationButton />

            <p className="mt-5 text-gray-700 text-center">
                Есть аккаунта?{" "}
                <Link
                    href="/"
                    className="text-sky-700 hover:text-sky-500 hover:underline"
                >
                    Войти
                </Link>
            </p>
        </form>
    );
}

function RegistrationButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-5" aria-disabled={pending}>
            Зарегистрироваться
        </Button>
    );
}
