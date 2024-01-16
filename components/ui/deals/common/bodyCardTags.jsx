"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ButtonPlus from "@/components/ui/buttonPlus";

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
        <div className="table-cell">
            <div
                ref={listRef}
                onClick={() => setActive(true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center relative w-full h-8 text-xs ${
                    active
                        ? "flex-wrap border border-blue-800"
                        : "flex-nowrap border-r "
                }`}
            >
                <div className="flex items-center justify-start gap-1 px-2 overflow-hidden">
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
                                        onClick={(e) =>
                                            handleRemoveTag(e, t.id)
                                        }
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
                            onChange={onItemSearch}
                            className="py-1 px-2 outline-none w-full"
                        />

                        {filteredTags.length > 0 ? (
                            <ul>
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
        </div>
    );
}
