"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardRisk({ dealRisk, dealHover, columnWidth }) {
    const [open, setOpen] = useState(false);
    const [risk, setRisk] = useState("");

    const handleChange = ({ target }) => {
        setRisk(target.value);
    };

    useEffect(() => {
        if (dealRisk) {
            setRisk(dealRisk);
        }
    }, [dealRisk]);

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
                name="risk"
                value={risk}
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
