"use client";

import React, { useState } from "react";

import InputField from "../common/inputField";
import ButtonSubmit from "../common/buttonSubmit";

const initData = {
    firstname: "",
    lastname: "",
    password: "",
    confPassword: "",
};

export default function FormProfile() {
    const [data, setData] = useState(initData);

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleChangeImage = (img) => {
        setData((prev) => ({ ...prev, image: img }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-80 md:mx-0 mx-auto w-full relative"
        >
            <InputField
                label="Введите имя"
                type="text"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
            />
            <InputField
                label="Введите фамилию"
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
            />
            <InputField
                label="Введите новый пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <InputField
                label="Повторите пароль"
                type="password"
                name="password"
                value={data.confPassword}
                onChange={handleChange}
            />

            <ButtonSubmit className="mt-5" name="Сохранить изменения" />
        </form>
    );
}
