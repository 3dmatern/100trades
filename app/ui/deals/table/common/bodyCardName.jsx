"use client";

import React, { useEffect, useRef, useState } from "react";

import CheckboxOrNumber from "./checkboxOrNumber";

export default function BodyCardName({
    index,
    dealId,
    dealName,
    selectedDeals,
    checkAll,
    dealHover,
    onChangeCheckbox,
}) {
    const cellRef = useRef(null);
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cellRef.current && !cellRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const handleScroll = () => {
            setOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`flex items-center w-28 fixed ${
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
                className={`border-r h-8 px-2 text-xs w-4/5 outline-none ${
                    selectedDeals?.includes(dealId) || dealHover
                        ? "bg-slate-50"
                        : "bg-white"
                }`}
            />
        </div>
    );
}
