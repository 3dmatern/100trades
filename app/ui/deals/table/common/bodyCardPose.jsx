"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardPose({ dealPose, dealHover }) {
    const [open, setOpen] = useState(false);
    const [pose, setPose] = useState("");

    const handleChange = ({ target }) => {
        const inputValue = target.value.replace(/[^\d]/g, "");
        const formattedNumber = parseFloat(inputValue).toLocaleString("en-US", {
            minimumFractionDigits: 2,
        });

        setPose(formattedNumber);
    };

    useEffect(() => {
        if (dealPose) {
            const inputValue = dealPose.replace(/[^\d]/g, "");
            const formattedNumber = parseFloat(inputValue).toLocaleString(
                "ru-RU",
                {
                    minimumFractionDigits: 2,
                }
            );
            setPose(formattedNumber);
        }
    }, [dealPose]);

    return (
        <div
            className={`flex items-center justify-center relative ${
                open ? "border border-blue-800" : "border-r"
            } w-24 min-w-4 h-8 px-2 text-xs`}
        >
            <span className="absolute top-auto left-1">₽</span>
            <input
                type="text"
                name="pose"
                value={pose}
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
