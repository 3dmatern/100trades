"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function BodyCardTags({
    tag,
    filteredTags,
    currentTags,
    onItemSearch,
    onClickSelectTag,
    onRemoveItem,
    columnWidth,
    determineTextColor,
    getRandomHexColor,
}) {
    const listRef = useRef(null);
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [tagBgColor, setTagBgColor] = useState("");

    const handleSelectTag = (tag) => {
        onClickSelectTag(tag);
        setOpen(false);
        setActive(false);
    };

    const handleRemoveTag = (e, id) => {
        e.stopPropagation();
        onRemoveItem(id);
        setOpen(false);
        setActive(false);
    };

    useEffect(() => {
        if (open) {
            setTagBgColor(getRandomHexColor());
        }
    }, [getRandomHexColor, open]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setOpen(false);
                setActive(false);
            }
        };
        const handleScroll = () => {
            setOpen(false);
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
        <div ref={listRef} className="table-cell relative h-full">
            <div
                onClick={() => setActive(true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center justify-start gap-1 w-full h-full text-xs bg-white ${
                    open
                        ? "flex-wrap min-h-8 max-h-16 overflow-y-auto absolute top-0 left-0 p-1 border border-blue-800"
                        : "border-r px-2 overflow-hidden"
                }`}
            >
                {currentTags.length > 0 &&
                    currentTags?.map((t) => (
                        <span
                            key={t.label}
                            style={{
                                color: determineTextColor(t.value),
                                backgroundColor: t.value,
                            }}
                            className="flex items-center gap-1 rounded-xl px-2 py-px"
                        >
                            <span className="whitespace-nowrap text-ellipsis">
                                {t.label}
                            </span>
                            {active && (
                                <button
                                    type="button"
                                    onClick={(e) => handleRemoveTag(e, t.id)}
                                    className="p-0.5 cursor-pointer"
                                >
                                    <Image
                                        src="./remove.svg"
                                        alt="remove"
                                        width={10}
                                        height={10}
                                    />
                                </button>
                            )}
                        </span>
                    ))}

                {active && (
                    <Button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="flex items-center justify-center size-7 p-1 rounded-sm bg-slate-100 hover:bg-slate-200"
                    >
                        <Image
                            src="./plus-lg.svg"
                            alt="plus"
                            width={16}
                            height={16}
                        />
                    </Button>
                )}
            </div>

            {open && (
                <div className="w-full absolute top-16 left-0 z-10 rounded-md py-2 bg-white border border-gray-300">
                    <input
                        type="text"
                        name="tag"
                        value={tag}
                        placeholder="Введите тэг"
                        onChange={onItemSearch}
                        className="py-1 px-2 outline-none w-full"
                    />

                    {filteredTags.length > 0 ? (
                        <ul className="flex items-center justify-start flex-wrap gap-1 w-full px-2 text-xs bg-white ">
                            {filteredTags
                                .filter(
                                    (t) =>
                                        !currentTags?.some(
                                            (item) => item.id === t.id
                                        )
                                )
                                .map((tag) => (
                                    <li
                                        key={tag.label}
                                        onClick={() => handleSelectTag(tag)}
                                        className="flex items-center justify-start hover:bg-slate-200 cursor-pointer"
                                    >
                                        <span
                                            key={tag.label}
                                            style={{
                                                color: determineTextColor(
                                                    tag.value
                                                ),
                                                backgroundColor: tag.value,
                                            }}
                                            className="rounded-xl px-2 py-px"
                                        >
                                            {tag.label}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <div className="flex items-center gap-1 px-2 text-xs">
                            Добавит тег:{" "}
                            <span
                                style={{
                                    color: determineTextColor(tagBgColor),
                                    backgroundColor: tagBgColor,
                                }}
                                onClick={() =>
                                    handleSelectTag({
                                        label: tag,
                                        value: tagBgColor,
                                    })
                                }
                                className="rounded-xl px-2 py-px cursor-pointer"
                            >
                                {tag}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
