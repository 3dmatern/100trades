"use client";

import React, { useEffect, useState } from "react";

import InputField from "../input";
import ButtonSubmit from "../button";

export default function FormName({ currentUser }) {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
    });

    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    useEffect(() => {
        if (currentUser) {
            setData({
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
            });
        }
    }, [currentUser]);

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

            <ButtonSubmit className="mt-5" name="Сохранить изменения" />
        </form>
    );
}
