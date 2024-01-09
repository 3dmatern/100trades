"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardProfit({ dealProfit, dealHover, columnWidth }) {
    const [open, setOpen] = useState(false);
    const [profit, setProfit] = useState("");

    const handleChange = ({ target }) => {
        setProfit(target.value);
    };

    useEffect(() => {
        if (dealProfit) {
            setProfit(dealProfit);
        }
    }, [dealProfit]);

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center relative ${
                open ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            <span className="absolute top-auto right-2">%</span>
            <input
                type="number"
                step="0.10"
                max={100.0}
                name="profit"
                value={profit}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={`pr-2 text-xs w-full text-end outline-none overflow-hidden whitespace-nowrap text-ellipsis ${
                    dealHover ? "bg-slate-50" : "bg-white"
                }`}
            />
        </div>
    );
}
