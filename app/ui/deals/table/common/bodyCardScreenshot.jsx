"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BodyCardScreenshot({
    dealImageSrc,
    imageAlt,
    width,
    height,
}) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleKyeDown = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKyeDown);
        return () => {
            document.removeEventListener("keydown", handleKyeDown);
        };
    }, [open]);

    return (
        <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs">
            {dealImageSrc && !open && (
                <Image
                    src={`/${dealImageSrc}`}
                    alt={imageAlt}
                    width={width}
                    height={height}
                    onClick={handleClick}
                    className="hover:scale-125 cursor-pointer"
                />
            )}
            {dealImageSrc && (
                <div
                    className={`fixed w-screen h-screen z-50 top-0 left-0 bg-slate-900 p-4 ${
                        !open
                            ? "opacity-0 transform scale-0"
                            : "opacity-100 transform scale-100"
                    } transition-transform duration-300`}
                >
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute top-4 right-4 z-50 p-0.5 cursor-pointer text-cyan-500"
                    >
                        <Image
                            src="./close.svg"
                            alt="close"
                            width={16}
                            height={16}
                        />
                    </button>

                    <p className="text-center text-sm text-white">
                        {dealImageSrc}
                    </p>

                    <img
                        src={`/${dealImageSrc}`}
                        alt={imageAlt}
                        className="mt-6 m-auto w-5/6"
                    />
                </div>
            )}
        </div>
    );
}
