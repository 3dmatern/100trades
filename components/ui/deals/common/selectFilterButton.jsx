"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SelectFilterButton({
    children,
    name,
    nameColumn,
    initWidth,
    onResize,
    className,
    classNameContent,
    styleBtn,
}) {
    const filterRef = useRef(null);
    const listRef = useRef(null);
    const resizeRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [resizeHover, setResizeHover] = useState(false);

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
        <div className={cn("table-cell", className)}>
            <div
                ref={filterRef}
                style={{
                    width: initWidth,
                    minWidth: "64px",
                }}
                className={cn(
                    "flex items-center w-full h-8 px-2 relative border-r border-slate-300",
                    classNameContent
                )}
            >
                <button
                    type="button"
                    onClick={handleClick}
                    className="flex items-center justify-between gap-1 text-start text-xs"
                    style={styleBtn}
                >
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {name}
                    </span>{" "}
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
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2"
                        >
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
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2"
                        >
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

                <div
                    ref={resizeRef}
                    onMouseEnter={() => setResizeHover(true)}
                    onMouseLeave={() => setResizeHover(false)}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const iWidth = initWidth;
                        const startX = e.clientX;

                        const handleMouseMove = (e) => {
                            const newWidth = `${
                                parseInt(iWidth) + (e.clientX - startX)
                            }px`;
                            setResizeHover(true);
                            onResize(nameColumn, newWidth);
                        };

                        const handleMouseUp = () => {
                            document.removeEventListener(
                                "mousemove",
                                handleMouseMove
                            );
                            document.removeEventListener(
                                "mouseup",
                                handleMouseUp
                            );
                            setResizeHover(false);
                        };

                        document.addEventListener("mousemove", handleMouseMove);
                        document.addEventListener("mouseup", handleMouseUp);
                    }}
                    className="resize-x flex items-center justify-center w-3 h-full bg-transparent absolute top-0 right-0 translate-x-1/2 cursor-ew-resize"
                >
                    <div
                        className={`w-0.5 h-7 ${
                            resizeHover ? "bg-sky-500" : "bg-transparent"
                        } pointer-events-none`}
                    />
                </div>
            </div>
            {children}
        </div>
    );
}
