"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardPose({ dealPose, dealHover, columnWidth }) {
    const [open, setOpen] = useState(false);
    const [pose, setPose] = useState("");

    const handleChange = ({ target }) => {
        const value = target.value.replace(/[^0-9.,]/g, "");
        setPose(value);
    };

    useEffect(() => {
        if (dealPose) {
            const formattedNumber = parseFloat(dealPose).toLocaleString(
                "en-EN",
                {
                    minimumFractionDigits: 2,
                }
            );
            setPose(formattedNumber);
        }
    }, [dealPose]);

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center relative ${
                open ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            <span className="absolute top-auto left-1">₽</span>
            <input
                type="text"
                name="pose"
                value={pose}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={`pl-2 text-xs w-full outline-none overflow-hidden whitespace-nowrap text-ellipsis ${
                    dealHover ? "bg-slate-50" : "bg-white"
                }`}
            />
        </div>
    );
}
