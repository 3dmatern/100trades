"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BodyCardLP({
    lps,
    dealLP,
    determineTextColor,
    getRandomHexColor,
}) {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [filterLPs, setFilterLPs] = useState([]);
    const [lpBgColor, setLPBgColor] = useState("");
    const [currentLP, setCurrentLP] = useState(undefined);
    const [lp, setLP] = useState("");

    const handleChange = (value) => {
        setLP(value);
        setFilterLPs((prev) => prev.filter((p) => p.label.includes(value)));
    };

    const handleSelectLP = (e, lp) => {
        e.stopPropagation();
        console.log(lp);
        setOpen(!open);
        setCurrentLP(lp);
    };

    useEffect(() => {
        if (dealLP) {
            setCurrentLP(dealLP);
        }
    }, [dealLP]);

    useEffect(() => {
        if (lps) {
            setFilterLPs(lps);
            const color = getRandomHexColor();
            setLPBgColor(lps.some((l) => l.value !== color) && color);
        }
    }, [lps.length]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setOpen(false);
                setLP("");
                setFilterLPs(lps);
            }
        };
        const handleScroll = () => {
            setOpen(false);
            setLP("");
            setFilterLPs(lps);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lps]);

    return (
        <div
            ref={listRef}
            onClick={() => setOpen(!open)}
            className={`flex items-center justify-start relative ${
                open ? "border border-blue-800" : "border-r"
            } w-20 min-w-4 h-8 px-2 text-xs`}
        >
            {currentLP && (
                <button
                    type="button"
                    className="flex items-center justify-between w-full"
                >
                    <span
                        style={{
                            color: determineTextColor(currentLP.value),
                            backgroundColor: currentLP.value,
                        }}
                        className="rounded-xl px-2"
                    >
                        {currentLP.label}
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
                    <input
                        type="text"
                        name="lp"
                        value={lp}
                        placeholder="Введите L:P"
                        onChange={(e) => handleChange(e.target.value)}
                        className="py-1 px-2 outline-none w-full"
                    />

                    {filterLPs.length > 0 ? (
                        <ul>
                            {filterLPs
                                .filter((t) => !dealLP.id !== t.id)
                                .map((l) => (
                                    <li
                                        key={l.label}
                                        onClick={(e) => handleSelectLP(e, l)}
                                        className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                    >
                                        <span
                                            key={l.label}
                                            style={{
                                                color: determineTextColor(
                                                    l.value
                                                ),
                                                backgroundColor: l.value,
                                            }}
                                            className="rounded-xl px-2 py-px"
                                        >
                                            {l.label}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <div className="flex items-center gap-1 px-2 text-xs">
                            Добавит L:P{" "}
                            <span
                                onClick={(e) =>
                                    handleSelectLP(e, {
                                        label: lp,
                                        value: lpBgColor,
                                    })
                                }
                                style={{
                                    color: determineTextColor(lpBgColor),
                                    backgroundColor: lpBgColor,
                                }}
                                className="rounded-xl px-2 py-px cursor-pointer"
                            >
                                {lp}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
