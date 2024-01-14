"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const initRRs = [
    { id: "lp1", label: "1:2", value: getRandomHexColor() },
    { id: "lp2", label: "1:7", value: getRandomHexColor() },
    { id: "lp3", label: "1:10", value: getRandomHexColor() },
];

export default function BodyCardRR({
    dealRR,
    columnWidth,
    determineTextColor,
    getRandomHexColor,
}) {
    const listRef = useRef(null);
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [filterRRs, setFilterRRs] = useState([]);
    const [lpBgColor, setLPBgColor] = useState("");
    const [currentRR, setCurrentRR] = useState(undefined);
    const [rr, setRR] = useState("");

    const handleChange = (value) => {
        setRR(value);
        setFilterRRs((prev) => prev.filter((p) => p.label.includes(value)));
    };

    const handleSelectLP = (e, rr) => {
        e.stopPropagation();
        setActive(false);
        setOpen(false);
        setCurrentRR(rr);
    };

    useEffect(() => {
        if (dealRR) {
            setCurrentRR(dealRR);
        }
    }, [dealRR]);

    useEffect(() => {
        if (rrs) {
            setFilterRRs(rrs);
            const color = getRandomHexColor();
            setLPBgColor(rrs.some((l) => l.value !== color) && color);
        }
    }, [rrs.length]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setActive(false);
                setOpen(false);
                setRR("");
                setFilterRRs(rrs);
            }
        };
        const handleScroll = () => {
            setActive(false);
            setOpen(false);
            setRR("");
            setFilterRRs(rrs);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [rrs]);

    return (
        <div
            ref={listRef}
            onClick={() => setActive(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-start relative ${
                active ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            <button
                type="button"
                className="flex items-center justify-between w-full"
            >
                <span
                    style={
                        currentRR
                            ? {
                                  color: determineTextColor(currentRR.value),
                                  backgroundColor: currentRR.value,
                              }
                            : null
                    }
                    className="rounded-xl px-2 overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    {currentRR?.label}
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

            {active && (
                <div className="absolute left-0 top-8 z-10 w-max rounded-md py-2 bg-white border border-gray-300">
                    <input
                        type="text"
                        name="rr"
                        value={rr}
                        placeholder="Введите L:P"
                        onChange={(e) => handleChange(e.target.value)}
                        className="py-1 px-2 outline-none w-full"
                    />

                    {filterRRs.length > 0 ? (
                        <ul>
                            {filterRRs
                                .filter((t) => !dealRR?.id !== t.id)
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
                                        label: rr,
                                        value: lpBgColor,
                                    })
                                }
                                style={{
                                    color: determineTextColor(lpBgColor),
                                    backgroundColor: lpBgColor,
                                }}
                                className="rounded-xl px-2 py-px cursor-pointer"
                            >
                                {rr}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
