"use client";

import React, { useEffect, useState } from "react";

import CheckboxOrNumber from "./checkboxOrNumber";

export default function BodyCardName({
    index,
    dealId,
    dealName,
    selectedDeals,
    checkAll,
    dealHover,
    columnWidth,
    onChangeCheckbox,
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleChange = ({ target }) => {
        setName(target.value);
    };

    useEffect(() => {
        if (dealName) {
            setName(dealName);
        }
    }, [dealName]);

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center fixed z-10 ${
                open ? "border border-blue-800" : "border-r"
            } ${
                selectedDeals?.includes(dealId) || dealHover
                    ? "bg-slate-50"
                    : "bg-white"
            }`}
        >
            <CheckboxOrNumber
                number={index + 1}
                name="deals"
                value={dealId}
                checked={selectedDeals?.includes(dealId)}
                checkAll={checkAll}
                onChange={onChangeCheckbox}
            />

            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={`h-8 px-2 text-xs w-4/5 outline-none overflow-hidden whitespace-nowrap text-ellipsis ${
                    selectedDeals?.includes(dealId) || dealHover
                        ? "bg-slate-50"
                        : "bg-white"
                }`}
            />
        </div>
    );
}
