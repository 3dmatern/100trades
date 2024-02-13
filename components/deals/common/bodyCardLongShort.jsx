"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretUpIcon } from "@/components/icons/caret-up-icon";
import { CaretDownIcon } from "@/components/icons/caret-down-icon";

export default function BodyCardLongShort({
    dealId,
    lsId,
    longShorts,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
}) {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [longShort, setLongShort] = useState(undefined);

    const handleSelectResult = (ls) => {
        setLongShort((prev) => ls);
        onActionDeal({ id: dealId, lsId: ls.id });
        setLongShort((prev) => undefined);
    };

    useEffect(() => {
        if (lsId && longShorts) {
            setLongShort((prev) => longShorts.find((item) => item.id === lsId));
        }
    }, [lsId, longShorts]);

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
                        isPending["lsId"] &&
                        dealId === isPending.id
                    }
                    className="flex items-center justify-between w-full"
                >
                    {longShort ? (
                        <span
                            style={{ color: longShort.value }}
                            className="text-center"
                        >
                            {longShort.label === "long" ? (
                                <CaretUpIcon />
                            ) : (
                                <CaretDownIcon />
                            )}
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
                        {longShorts
                            ?.filter((ls) => lsId !== ls.id)
                            .map((longShort) => (
                                <li
                                    key={longShort.label}
                                    onClick={() =>
                                        handleSelectResult(longShort)
                                    }
                                    className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                >
                                    <span
                                        style={{
                                            color: longShort.value,
                                        }}
                                        className="inline-block py-1 px-2 rounded-xl text-xs uppercase"
                                    >
                                        {longShort.label === "long" ? (
                                            <CaretUpIcon />
                                        ) : (
                                            <CaretDownIcon />
                                        )}
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
