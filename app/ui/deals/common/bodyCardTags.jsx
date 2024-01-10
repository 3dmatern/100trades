"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ButtonPlus from "@/app/ui/common/buttonPlus";

export default function BodyCardTags({
    dealId,
    tags,
    dealTags,
    columnWidth,
    determineTextColor,
    getRandomHexColor,
}) {
    const listRef = useRef(null);
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [filterTags, setFilterTags] = useState([]);
    const [tagBgColor, setTagBgColor] = useState("");
    const [tag, setTag] = useState("");

    const handleChange = (value) => {
        setTag(value);
        setFilterTags((prev) => prev.filter((p) => p.label.includes(value)));
    };

    const handleSelectTag = (tag) => {
        setOpen(false);
        setActive(false);
        setTag("");
    };

    useEffect(() => {
        if (tags) {
            setFilterTags(tags);
            const color = getRandomHexColor();
            setTagBgColor(tags.some((tag) => tag.value !== color) && color);
        }
    }, [tags.length]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setOpen(false);
                setActive(false);
                setTag("");
                setFilterTags(tags);
            }
        };
        const handleScroll = () => {
            setOpen(false);
            setActive(false);
            setTag("");
            setFilterTags(tags);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tags]);

    return (
        <div
            ref={listRef}
            onClick={() => setActive(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-start relative ${
                active
                    ? "flex-wrap border border-blue-800"
                    : "flex-nowrap border-r "
            } h-8 text-xs`}
        >
            <div className="flex items-center justify-start gap-1 px-2 overflow-hidden">
                {dealTags?.map((tag) => (
                    <span
                        key={tag.label}
                        style={{
                            color: determineTextColor(tag.value),
                            backgroundColor: tag.value,
                        }}
                        className="flex items-center gap-1 rounded-xl px-2 py-px"
                    >
                        <span className="whitespace-nowrap text-ellipsis">
                            {tag.label}
                        </span>
                        {active && (
                            <button
                                type="button"
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

                {active && <ButtonPlus onClick={() => setOpen(!open)} />}
            </div>

            {open && (
                <div className="absolute left-0 top-8 z-10 w-full rounded-md py-2 bg-white border border-gray-300">
                    <input
                        type="text"
                        name="tag"
                        value={tag}
                        placeholder="Введите тэг"
                        onChange={(e) => handleChange(e.target.value)}
                        className="py-1 px-2 outline-none w-full"
                    />

                    {filterTags.length > 0 ? (
                        <ul>
                            {filterTags
                                .filter(
                                    (t) =>
                                        !dealTags?.some(
                                            (item) => item.id === t.id
                                        )
                                )
                                .map((tag) => (
                                    <li
                                        key={tag.label}
                                        onClick={() => handleSelectTag(tag)}
                                        className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
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
