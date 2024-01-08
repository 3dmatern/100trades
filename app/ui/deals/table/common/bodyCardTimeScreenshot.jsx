"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardTimeScreenshot({
    dealTimeScreenshot,
    dealHover,
}) {
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState("");

    const handleChange = ({ target }) => {
        setTime(target.value);
    };

    useEffect(() => {
        if (dealTimeScreenshot) {
            setTime(dealTimeScreenshot);
        }
    }, [dealTimeScreenshot]);

    return (
        <div
            className={`flex items-center justify-center ${
                open ? "border border-blue-800" : "border-r"
            } w-32 min-w-4 h-8 px-2 text-xs`}
        >
            <input
                type="number"
                step={1}
                name="time"
                value={time}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className={`text-xs text-center w-full outline-none ${
                    dealHover ? "bg-slate-50" : "bg-white"
                }`}
            />
        </div>
    );
}
