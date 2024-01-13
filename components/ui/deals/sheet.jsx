"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Sheet({
    className,
    index,
    selectSheet,
    sheet,
    onClickId,
}) {
    const sheetRef = useRef(null);
    const formRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [sheetValue, setSheetValue] = useState("");

    useEffect(() => {
        if (sheet) {
            setSheetValue(sheet.name);
        }
    }, [sheet]);

    useEffect(() => {
        if (formRef.current) {
            const form = formRef.current;
            const rect = form.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                form.style.left = "unset";
                form.style.right = "0px";
            }
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sheetRef.current && !sheetRef.current.contains(e.target)) {
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
            ref={sheetRef}
            onClick={() => onClickId(sheet.id)}
            className={clsx(
                "flex items-center justify-center gap-1 w-max h-9 px-2 relative bg-gray-200 hover:bg-gray-100 rounded-t-lg cursor-pointer",
                className
            )}
        >
            <span>{sheet.name}</span>

            {index === selectSheet ? (
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                >
                    <Image
                        src="./pencil.svg"
                        alt="edit"
                        width={13}
                        height={13}
                        className="pointer-events-none"
                    />
                </button>
            ) : (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(sheet.id);
                    }}
                    className="cursor-pointer hover:scale-110"
                >
                    <Image
                        src="./removeSheet.svg"
                        alt="remove"
                        width={13}
                        height={13}
                        className="pointer-events-none"
                    />
                </button>
            )}

            <form
                ref={formRef}
                className={`${
                    open ? "block" : "hidden"
                } absolute top-9 left-0 z-30 p-2 bg-sky-200 rounded-md w-28`}
            >
                <input
                    type="text"
                    name="sheet"
                    value={sheetValue}
                    onChange={(e) => setSheetValue(e.target.value)}
                    className="w-full outline-none"
                />
            </form>
        </div>
    );
}
