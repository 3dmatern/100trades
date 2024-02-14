"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

import InputUploadImg from "@/components/ui/inputUploadImg";
import { uploadFile } from "@/actions/files";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function BodyCardScreenshot({
    deal,
    inputName,
    dealImageSrc,
    imageAlt,
    width,
    height,
    columnWidth,
    onActionDeal,
    onClickDealImg,
    isAdmin,
    isPublished,
}) {
    const cellRef = useRef(null);
    const [isPending, startTransaction] = useTransition();
    const [active, setActive] = useState(false);

    const handleChange = (formData) => {
        const fileName = `${deal?.id}_${Date.now()}_${inputName}`;
        formData.append("fileName", fileName);
        startTransaction(() => {
            uploadFile(formData).then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }
                onActionDeal({ id: deal?.id, [inputName]: data });
            });
        });
    };

    useEffect(() => {
        if (isPending) {
            setActive(false);
        }
    }, [isPending]);

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

    const getContents = ({
        isPending,
        dealImageSrc,
        active,
        isAdmin,
        isPublished,
    }) => {
        if (isPending) {
            return <BeatLoader size={8} />;
        }
        if (dealImageSrc) {
            return (
                <img
                    src={IMAGE_URL + "/" + dealImageSrc}
                    alt={imageAlt}
                    style={{ width, height }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClickDealImg({ deal, inputName });
                    }}
                    className="hover:scale-125 cursor-pointer"
                />
            );
        }
        if (!dealImageSrc && active && !isAdmin && !isPublished) {
            return (
                <InputUploadImg
                    name={inputName}
                    width={width}
                    height={height}
                    onImageChange={handleChange}
                />
            );
        }

        return (
            <Image
                src="/dropbox.svg"
                alt="dropbox"
                width={16}
                height={16}
                className="pointer-events-none"
            />
        );
    };

    return (
        <div className="table-cell align-middle h-full">
            <div
                ref={cellRef}
                onClick={() => setActive(true)}
                style={{ width: columnWidth, minWidth: "64px", height: "32px" }}
                className={`flex items-center justify-center h-full relative text-xs ${
                    active && !isAdmin && !isPublished
                        ? "border border-blue-800"
                        : "border-r"
                }`}
            >
                {getContents({
                    isPending,
                    dealImageSrc,
                    active,
                    isAdmin,
                    isPublished,
                })}
            </div>
        </div>
    );
}
