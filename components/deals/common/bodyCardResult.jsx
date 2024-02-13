"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BodyCardResult({
    dealId,
    resultId,
    results,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
}) {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState(undefined);

    const handleSelectResult = (res) => {
        setResult((prev) => res);
        onActionDeal({ id: dealId, resultId: res.id });
        setResult((prev) => undefined);
    };

    useEffect(() => {
        if (resultId && results.length > 0) {
            setResult((prev) => results.find((item) => item.id === resultId));
        }
    }, [resultId, results]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setOpen((prev) => false);
            }
        };
        const handleScroll = () => {
            setOpen((prev) => false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="table-cell align-middle h-full">
            <div
                ref={listRef}
                onClick={() => setOpen((prev) => !prev)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center h-full px-2 relative border-r border-slate-300"
            >
                <button
                    type="button"
                    disabled={
                        isPending &&
                        isPending["resultId"] &&
                        dealId === isPending.id
                    }
                    className="flex items-center justify-between w-full"
                >
                    {result ? (
                        <span
                            style={{ backgroundColor: result.value }}
                            className="inline-block py-1 px-2 rounded-xl text-xs uppercase overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                            {result.label}
                        </span>
                    ) : (
                        <span />
                    )}
                    {!isAdmin && (
                        <Image
                            src="/arrow-down.svg"
                            alt="arrow"
                            width={10}
                            height={10}
                            style={{
                                rotate: open ? "180deg" : "0deg",
                                transition: "all .3s",
                            }}
                        />
                    )}
                </button>

                {open && !isAdmin && (
                    <ul className="w-full absolute left-0 top-8 z-[1] rounded-md py-2 bg-white border border-gray-300">
                        {results
                            ?.filter((r) => resultId !== r.id)
                            .map((res) => (
                                <li
                                    key={res.label}
                                    onClick={() => handleSelectResult(res)}
                                    className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                >
                                    <span
                                        style={{
                                            backgroundColor: res.value,
                                        }}
                                        className="inline-block py-1 px-2 rounded-xl text-xs uppercase"
                                    >
                                        {res.label}
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
