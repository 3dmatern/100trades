"use client";

import React, { useState } from "react";

import CheckboxOrNumber from "./common/checkboxOrNumber";
import SelectFilterButton from "./common/selectFilterButton";

const initHeaders = [
    { name: "Тикер", up: false },
    { name: "Win-Loss", up: true },
    { name: "Поза", up: false },
    { name: "Риск", up: false },
    { name: "L:P", up: true },
    { name: "Вход", up: true },
    { name: "Скрин", up: true },
    { name: "Депозит", up: true },
    { name: "Прогресс", up: true },
    { name: "Выход", up: true },
    { name: "Скрин2", up: true },
    { name: "Пора?", up: false },
    { name: "Стресс", up: true },
    { name: "Tags", up: false },
    { name: "Заметки", up: false },
    { name: "Время в сделке", up: true },
    { name: "Для скрина (мин)", up: false },
    { name: "Actual Date", up: false },
    { name: "Assigne", up: false },
    { name: "Status", up: false },
];

export default function TableHead() {
    const [checkAll, setCheckAll] = useState(false);

    const handleChange = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => !prev);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-b border-slate-300 bg-gray-50">
            <CheckboxOrNumber
                name="checkAll"
                checked={checkAll}
                onChange={handleChange}
            />
            {initHeaders.map((item) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    style={item.up ? { "text-transform": "uppercase" } : null}
                />
            ))}
        </div>
    );
}
