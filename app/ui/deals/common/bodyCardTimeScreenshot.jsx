"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardTimeScreenshot({
    dealTimeScreenshot,
    dealHover,
    columnWidth,
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
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center ${
                open ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
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
