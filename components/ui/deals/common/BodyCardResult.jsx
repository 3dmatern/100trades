"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { getResults } from "@/actions/result";

export default function BodyCardResult({
    userId,
    sheetId,
    dealId,
    dealResult,
    columnWidth,
}) {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [result, setResult] = useState(undefined);

    const handleSelectResult = (res) => {
        // e.stopPropagation();
        setOpen(false);
        setResult(res);
    };

    useEffect(() => {
        if (dealResult) {
            setResult(results.find((item) => item.type === dealResult));
        }
    }, [dealResult, results]);

    useEffect(() => {
        const onResults = async () => {
            const result = await getResults();
            if (result) {
                setResults(result);
            } else {
                setResults([]);
            }
        };
        onResults();
    }, []);

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
            {result && (
                <button
                    type="button"
                    className="flex items-center justify-between w-full"
                >
                    <span
                        className={`inline-block py-1 px-2 ${result.value} rounded-xl text-xs uppercase overflow-hidden whitespace-nowrap text-ellipsis`}
                    >
                        {result.label}
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
                            {results
                                .filter((r) => !dealResult !== r.type)
                                .map((res) => (
                                    <li
                                        key={res.label}
                                        onClick={() => handleSelectResult(res)}
                                        className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                    >
                                        <span
                                            className={`inline-block py-1 px-2 rounded-xl ${res.value} text-xs uppercase`}
                                        >
                                            {res.label}
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
