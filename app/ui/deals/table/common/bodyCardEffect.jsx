"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const initEffects = [
    { label: "win", value: "bg-green-300", type: "win" },
    { label: "активна", value: "bg-orange-300", type: "active" },
    { label: "бу", value: "bg-gray-300", type: "noLoss" },
    { label: "loss", value: "bg-red-300", type: "loss" },
];

export default function BodyCardEffect({ dealEffect, columnWidth }) {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [effect, setEffect] = useState(undefined);

    const handleSelectLP = (ef) => {
        // e.stopPropagation();
        setOpen(false);
        setEffect(ef);
    };

    useEffect(() => {
        if (dealEffect) {
            setEffect(initEffects.find((item) => item.type === dealEffect));
        }
    }, [dealEffect]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
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
            ref={listRef}
            onClick={() => setOpen(!open)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className="flex items-center justify-center relative border-r h-8 px-2"
        >
            {effect && (
                <button
                    type="button"
                    className="flex items-center justify-between w-full"
                >
                    <span
                        className={`inline-block py-1 px-2 ${effect.value} rounded-xl text-xs uppercase overflow-hidden whitespace-nowrap text-ellipsis`}
                    >
                        {effect.label}
                    </span>

                    <Image
                        src="./arrow-down.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                        style={{
                            rotate: open ? "180deg" : "0deg",
                            transition: "all .3s",
                        }}
                    />
                </button>
            )}

            {open && (
                <div className="absolute left-0 top-8 z-10 w-max rounded-md py-2 bg-white border border-gray-300">
                    {
                        <ul>
                            {initEffects
                                .filter((e) => !dealEffect !== e.type)
                                .map((ef) => (
                                    <li
                                        key={ef.label}
                                        onClick={() => handleSelectLP(ef)}
                                        className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                    >
                                        <span
                                            className={`inline-block py-1 px-2 rounded-xl ${ef.value} text-xs uppercase`}
                                        >
                                            {ef.label}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    }
                </div>
            )}
        </div>
    );
}
