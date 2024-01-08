"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BodyCardDate({ dealDate, name, columnWidth }) {
    const cellRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");

    const handleChange = ({ target }) => {
        console.log(target.value);
        setDate(target.value);
    };

    useEffect(() => {
        if (dealDate) {
            setDate(new Date(dealDate).toISOString().slice(0, 16));
        }
    }, [dealDate]);

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
            ref={cellRef}
            onClick={() => setOpen(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center ${
                open ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            {open ? (
                <input
                    type="datetime-local"
                    name={name}
                    defaultValue={date}
                    onChange={handleChange}
                    onBlur={() => setOpen(false)}
                    className="outline-none"
                />
            ) : (
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {date && date.split("T")[0] + " " + date.split("T")[1]}
                </span>
            )}
        </div>
    );
}
