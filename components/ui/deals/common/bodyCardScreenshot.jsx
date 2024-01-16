"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import InputUploadImg from "@/components/ui/inputUploadImg";
import { uploadImage } from "@/actions/upload";

export default function BodyCardScreenshot({
    userId,
    dealName,
    inputName,
    dealImageSrc,
    imageAlt,
    width,
    height,
    columnWidth,
}) {
    const cellRef = useRef(null);
    const [active, setActive] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const handleChange = async (base64String) => {
        const fileName = `${userId}_${inputName}`;

        await uploadImage({ base64String, fileName }).then((data) => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            setImageSrc(data);
        });
    };

    const handleClick = () => {
        setOpenImage((prev) => !prev);
    };

    const handleRemove = () => {
        setImageSrc(null);
        setOpenImage(false);
    };

    useEffect(() => {
        if (dealImageSrc) {
            setImageSrc(dealImageSrc);
        }
    }, [dealImageSrc]);

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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cellRef.current && !cellRef.current.contains(e.target)) {
                setActive(false);
            }
        };
        const handleScroll = () => {
            setActive(false);
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
            ref={cellRef}
            onClick={() => setActive(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center h-8 px-2 relative text-xs ${
                active ? "border border-blue-800" : "border-r "
            }`}
        >
            {imageSrc && !openImage ? (
                <Image
                    src={`/${imageSrc}`}
                    alt={imageAlt}
                    width={width}
                    height={height}
                    onClick={handleClick}
                    className="hover:scale-125 cursor-pointer"
                />
            ) : imageSrc && openImage ? (
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
                        className="absolute top-4 right-4 z-50 p-0.5 cursor-pointer text-cyan-500"
                    >
                        <Image
                            src="./close.svg"
                            alt="close"
                            width={16}
                            height={16}
                        />
                    </button>

                    <p className="text-center text-sm text-white">{dealName}</p>

                    <img
                        src={`/${imageSrc}`}
                        alt={imageAlt}
                        className="mt-6 m-auto w-5/6"
                    />

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="block mx-auto mt-5 w-max py-1 px-2 bg-red-700 hover:bg-red-500 rounded-md text-white"
                    >
                        Удалить скриншот
                    </button>
                </div>
            ) : active ? (
                <InputUploadImg
                    name={inputName}
                    width={width}
                    height={height}
                    onImageChange={handleChange}
                />
            ) : (
                <Image
                    src="./dropbox.svg"
                    alt="dropbox"
                    width={16}
                    height={16}
                    className="pointer-events-none"
                />
            )}

            {imageSrc && (
                <div
                    onClick={handleRemove}
                    className="w-max absolute top-0.5 right-0.5 p-0.5 bg-gray-300 hover:bg-gray-500 rounded-full cursor-pointer z-10 hover:scale-110"
                >
                    <Image
                        src="./remove.svg"
                        alt="remove"
                        width={10}
                        height={10}
                        className="pointer-events-none"
                    />
                </div>
            )}
        </div>
    );
}
