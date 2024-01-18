"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { typeSortDown, typeSortUp } from "@/utils/sortType";

export default function SelectFilterButton({
    children,
    name,
    dbName,
    isSort,
    nameColumn,
    initWidth,
    onResize,
    onSort,
    className,
    classNameContent,
    styleBtn,
}) {
    const filterRef = useRef(null);
    const listRef = useRef(null);
    const resizeRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [resizeHover, setResizeHover] = useState(false);
    const [sortDown, setSortDown] = useState(null);
    const [sortUp, setSortUp] = useState(null);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSort = (data) => {
        onSort(data);
        setOpen(false);
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
        if (isSort) {
            setSortDown(typeSortDown(isSort));
            setSortUp(typeSortUp(isSort));
        }
    }, [isSort]);

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
        <div className={cn("table-cell align-middle h-full", className)}>
            <div
                ref={filterRef}
                style={{ width: initWidth, minWidth: "64px" }}
                className={cn(
                    "flex items-center h-full px-2 relative border-r border-slate-300",
                    classNameContent
                )}
            >
                <button
                    type="button"
                    onClick={handleClick}
                    className={`flex items-center justify-between gap-1 text-start text-xs ${
                        !isSort ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={styleBtn}
                >
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {name}
                    </span>
                    {isSort && (
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

                {isSort && (
                    <ul
                        ref={listRef}
                        className={`${
                            open ? "block" : "hidden"
                        } absolute left-0 top-8 z-50 w-max max-h-64 p-2 text-sm bg-white border border-slate-300 rounded-md`}
                    >
                        <li>
                            <button
                                type="button"
                                onClick={() =>
                                    handleSort({ iter: dbName, order: "asc" })
                                }
                                className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2"
                            >
                                <Image
                                    src="/sort-down.svg"
                                    alt="sort-down"
                                    width={16}
                                    height={16}
                                />
                                <span>{sortDown}</span>
                            </button>
                        </li>
                        <li className="my-1 border-b" />
                        <li>
                            <button
                                type="button"
                                onClick={() =>
                                    handleSort({ iter: dbName, order: "desc" })
                                }
                                className="flex items-center gap-3 w-full hover:bg-slate-100 hover:rounded-md px-2"
                            >
                                <Image
                                    src="/sort-up.svg"
                                    alt="sort-up"
                                    width={16}
                                    height={16}
                                />
                                <span>{sortUp}</span>
                            </button>
                        </li>
                    </ul>
                )}

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
