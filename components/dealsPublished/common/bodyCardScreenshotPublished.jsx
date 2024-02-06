"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function BodyCardScreenshotPublished({
    dealName,
    dealImageSrc,
    imageAlt,
    width,
    height,
    columnWidth,
}) {
    const [openImage, setOpenImage] = useState(false);

    const handleClick = () => {
        setOpenImage((prev) => !prev);
    };

    useEffect(() => {
        const handleKyeDown = (e) => {
            if (e.key === "Escape" && openImage) {
                setOpenImage(false);
            }
        };

        document.addEventListener("keydown", handleKyeDown);
        return () => {
            document.removeEventListener("keydown", handleKyeDown);
        };
    }, [openImage]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px", height: "32px" }}
                className="flex items-center justify-center h-full relative text-xs border-r"
            >
                {dealImageSrc && !openImage ? (
                    <img
                        src={IMAGE_URL + "/" + dealImageSrc}
                        alt={imageAlt}
                        style={{ width, height }}
                        onClick={handleClick}
                        className="hover:scale-125 cursor-pointer"
                    />
                ) : dealImageSrc && openImage ? (
                    <div
                        className={`fixed w-screen h-screen z-50 top-0 left-0 bg-slate-900 p-4 ${
                            !openImage
                                ? "opacity-0 transform scale-0"
                                : "opacity-100 transform scale-100"
                        } transition-transform duration-300`}
                    >
                        <button
                            type="button"
                            onClick={handleClick}
                            className="absolute top-4 right-10 z-50 p-0.5 cursor-pointer text-cyan-500"
                        >
                            <Image
                                src="/close.svg"
                                alt="close"
                                width={16}
                                height={16}
                            />
                        </button>

                        <p className="text-center text-sm text-white">
                            {dealName}
                        </p>

                        <img
                            src={IMAGE_URL + "/" + dealImageSrc}
                            alt={imageAlt}
                            style={{
                                maxWidth: "100%",
                                width: "auto",
                                height: "80%",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        />
                    </div>
                ) : (
                    <Image
                        src="/dropbox.svg"
                        alt="dropbox"
                        width={16}
                        height={16}
                        className="pointer-events-none"
                    />
                )}
            </div>
        </div>
    );
}
