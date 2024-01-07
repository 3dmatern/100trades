"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BodyCardDate({ dealDate, name }) {
    const cellRef = useRef(null);
    const [active, setActive] = useState(false);
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
                setActive(false);
            }
        };
        const handleScroll = () => {
            setOpen(false);
            setActive(false);
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
            onClick={() => {
                setActive(true);
                setOpen(true);
            }}
            className={`flex items-center justify-center ${
                active ? "border border-blue-800" : "border-r"
            } w-36 min-w-4 h-8 px-2 text-xs`}
        >
            {open ? (
                <input
                    type="datetime-local"
                    name={name}
                    defaultValue={date}
                    onChange={handleChange}
                    onBlur={() => {
                        setActive(false);
                        setOpen(false);
                    }}
                    className="outline-none"
                />
            ) : (
                date && date.split("T")[0] + " " + date.split("T")[1]
            )}
        </div>
    );
}
