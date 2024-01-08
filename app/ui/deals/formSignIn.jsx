"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import InputField from "../common/inputField";
import ButtonSubmit from "../common/buttonSubmit";

const initData = {
    email: "",
    password: "",
};

export default function FormSignIn() {
    const router = useRouter();
    const [data, setData] = useState(initData);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/deals");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-80 w-full">
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

            <ButtonSubmit className="mt-5" name="Войти" />

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
