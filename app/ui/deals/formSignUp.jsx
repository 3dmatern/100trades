"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import InputField from "../common/inputField";
import ButtonSubmit from "../common/buttonSubmit";

export default function FormSignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleChange = ({ target }) => {
        setEmail(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/deals");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-80 w-full">
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

            <ButtonSubmit className="mt-5" name="Зарегистрироваться" />

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
