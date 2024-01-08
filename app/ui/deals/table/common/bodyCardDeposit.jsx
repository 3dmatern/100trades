"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardDeposit({ dealDeposit, dealHover }) {
    const [open, setOpen] = useState(false);
    const [deposit, setDeposit] = useState("");

    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^0-9.,]/g, "");
        setDeposit(value);
    };

    useEffect(() => {
        if (dealDeposit) {
            const formattedNumber = parseFloat(dealDeposit).toLocaleString(
                "en-EN",
                {
                    minimumFractionDigits: 2,
                }
            );
            setDeposit(formattedNumber);
        }
    }, [dealDeposit]);

    return (
        <div
            className={`flex items-center justify-center relative ${
                open ? "border border-blue-800" : "border-r"
            } w-28 min-w-4 h-8 px-2 text-xs`}
        >
            <span className="absolute top-auto left-1">₽</span>
            <input
                type="text"
                name="deposit"
                value={deposit}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={`pl-2 text-xs w-full outline-none ${
                    dealHover ? "bg-slate-50" : "bg-white"
                }`}
            />
        </div>
    );
}
