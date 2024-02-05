"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

import InputUploadImg from "@/components/ui/inputUploadImg";
import { uploadFile, deleteFile } from "@/actions/files";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function BodyCardScreenshot({
    dealId,
    dealName,
    inputName,
    dealImageSrc,
    imageAlt,
    width,
    height,
    columnWidth,
    onUpdateDeal,
}) {
    const cellRef = useRef(null);
    const [isPending, startTransaction] = useTransition();
    const [active, setActive] = useState(false);
    const [openImage, setOpenImage] = useState(false);

    const handleChange = (formData) => {
        const fileName = `${dealId}_${Date.now()}_${inputName}`;
        formData.append("fileName", fileName);
        startTransaction(() => {
            uploadFile(formData).then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                onUpdateDeal({ id: dealId, [inputName]: data });
            });
        });
    };

    const handleClick = () => {
        setOpenImage((prev) => !prev);
    };

    const handleRemove = (e, fileName) => {
        e.stopPropagation();
        startTransaction(() => {
            onUpdateDeal({ id: dealId, [inputName]: "" });

            deleteFile(fileName).then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                if (data.success) {
                    toast.success(data.success);
                    setOpenImage(false);
                }
            });
        });
    };

    useEffect(() => {
        if (isPending) {
            setActive(false);
            setOpenImage(false);
        }
    }, [isPending]);

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
        <div className="table-cell align-middle h-full">
            <div
                ref={cellRef}
                onClick={() => setActive(true)}
                style={{ width: columnWidth, minWidth: "64px", height: "32px" }}
                className={`flex items-center justify-center h-full relative text-xs ${
                    active ? "border border-blue-800" : "border-r"
                }`}
            >
                {isPending ? (
                    <BeatLoader size={8} />
                ) : dealImageSrc && !openImage ? (
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

                        <button
                            type="button"
                            onClick={(e) => handleRemove(e, dealImageSrc)}
                            className="w-max py-1 px-2 absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-700 hover:bg-red-500 rounded-md text-white"
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
                        src="/dropbox.svg"
                        alt="dropbox"
                        width={16}
                        height={16}
                        className="pointer-events-none"
                    />
                )}

                {dealImageSrc && !isPending && (
                    <div
                        onClick={(e) => handleRemove(e, dealImageSrc)}
                        className="w-max absolute top-0.5 right-0.5 p-0.5 z-[0] bg-gray-300 hover:bg-gray-500 rounded-full cursor-pointer hover:scale-110"
                    >
                        <Image
                            src="/remove.svg"
                            alt="remove"
                            width={10}
                            height={10}
                            className="pointer-events-none"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
