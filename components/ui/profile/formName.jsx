"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormName({ currentUser }) {
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
            <Input
                label="Введите имя"
                type="text"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
            />
            <Input
                label="Введите фамилию"
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
            />

            <Button className="mt-5" name="Сохранить изменения" />
        </form>
    );
}
