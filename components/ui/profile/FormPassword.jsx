"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initData = {
    password: "",
    confPassword: "",
};

export function FormPassword({ currentUser }) {
    const [data, setData] = useState(initData);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-80 lg:mt-0 mt-5 md:mx-0 mx-auto w-full relative"
        >
            <Input
                label="Введите новый пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <Input
                label="Повторите пароль"
                type="password"
                name="password"
                value={data.confPassword}
                onChange={handleChange}
            />

            <Button className="mt-5" name="Изменить пароль" />
        </form>
    );
}
