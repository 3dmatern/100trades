"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SelectFilterButton({
    name,
    className,
    style,
    styleBtn,
}) {
    const filterRef = useRef(null);
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        if (listRef.current) {
            const list = listRef.current;
            const rect = list.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                list.style.left = "unset";
                list.style.right = "0px";
                console.log(list.style.left);
            }
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
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
            ref={filterRef}
            className={`flex items-center relative h-8 border-r border-slate-300 px-2 ${className}`}
            style={style}
        >
            <button
                onClick={handleClick}
                className="flex items-center justify-between gap-1 min-w-16 text-start text-xs"
                style={styleBtn}
            >
                {name}{" "}
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

            <ul
                ref={listRef}
                className={`${
                    open ? "block" : "hidden"
                } absolute left-0 top-8 z-50 w-max max-h-64 p-3 bg-white border border-slate-300 rounded-md`}
            >
                <li>
                    <button className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2">
                        <Image
                            src="./sort-down.svg"
                            alt="sort-down"
                            width={16}
                            height={16}
                        />{" "}
                        <span>Sort A -{">"} Z</span>
                    </button>{" "}
                </li>
                <li className="my-1 border-b" />
                <li>
                    <button className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2">
                        <Image
                            src="./sort-up.svg"
                            alt="sort-up"
                            width={16}
                            height={16}
                        />{" "}
                        <span>Sort Z -{">"} A</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
