"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { createTag, getTags } from "@/actions/tag";
import {
    createEntrieTag,
    getEntrieTags,
    removeEntrieTag,
} from "@/actions/entrieTag";

export default function BodyCardTags({
    userId,
    dealId,
    allTags,
    onUpdateAllTags,
    columnWidth,
    dealHover,
    selectedDeals,
    determineTextColor,
    getRandomHexColor,
    onActionDeal,
    isAdmin,
    isPublished,
}) {
    const selectRef = useRef(null);
    const listRef = useRef(null);
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [filteredTags, setFilteredTags] = useState([]);
    const [currentTags, setCurrentTags] = useState(null);
    const [tag, setTag] = useState("");
    const [tagBgColor, setTagBgColor] = useState("");

    const handleItemSearch = ({ target }) => {
        if (target.name === "tag") {
            setTag((prev) => target.value);
            setFilteredTags((prev) =>
                allTags.filter((tag) => tag.label.includes(target.value))
            );
        }
    };

    const handleSelectTag = async (tag) => {
        setOpen((prev) => false);
        setActive((prev) => false);
        setTag((prev) => "");
        let selectTag = tag;
        let updTags = allTags;
        let newDealId = "";

        if (!selectTag.id) {
            const { newTag, success, error } = await createTag({
                ...tag,
                userId,
            });

            if (error) {
                toast.error(error);
                return;
            } else {
                toast.success(success);
                selectTag = newTag;
                updTags = await getTags(userId);
                onUpdateAllTags(updTags);
            }
        }

        if (!dealId) {
            newDealId = await onActionDeal();
        }

        const { success, error } = await createEntrieTag(userId, {
            entrieId: dealId || newDealId,
            tagId: selectTag.id,
        });
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
            getEntrieTagsData(updTags, dealId);
        }
    };

    const handleRemoveTag = async (e, tagId) => {
        e.stopPropagation();
        setOpen((prev) => false);
        setActive((prev) => false);

        await removeEntrieTag(userId, { entrieId: dealId, tagId }).then(
            (data) => {
                if (data.error) {
                    toast.error(data.error);
                }
                if (data.success) {
                    toast.success(data.success);
                    setCurrentTags((prev) =>
                        prev.filter((tag) => tag.id !== tagId)
                    );
                }
            }
        );
    };

    const getEntrieTagsData = async (tags, dealId) => {
        if (dealId) {
            const entrieTagsData = await getEntrieTags(dealId);
            if (entrieTagsData.error) {
                toast.error(entrieTagsData.error);
            } else {
                setCurrentTags((prev) =>
                    tags?.filter((tag) =>
                        entrieTagsData.entrieTags.some(
                            (et) => tag.id === et.tagId
                        )
                    )
                );
            }
        } else {
            setCurrentTags((prev) => []);
        }
    };

    useEffect(() => {
        if (listRef.current) {
            const list = listRef.current;
            const rect = list.getBoundingClientRect();

            if (rect.bottom > window.innerHeight - 32) {
                list.style.top = "unset";
                list.style.bottom = "32px";
            }
        }
    }, [open]);

    useEffect(() => {
        if (allTags) {
            setFilteredTags((prev) => allTags);
        }
    }, [allTags]);

    useEffect(() => {
        if ((allTags, dealId)) {
            getEntrieTagsData(allTags, dealId);
        } else {
            setCurrentTags((prev) => []);
        }
    }, [allTags, dealId]);

    useEffect(() => {
        if (open) {
            setTagBgColor((prev) => getRandomHexColor());
        }
    }, [getRandomHexColor, open]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setOpen((prev) => false);
                setActive((prev) => false);
            }
        };
        const handleScroll = () => {
            setOpen((prev) => false);
            setActive((prev) => false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div ref={selectRef} className="table-cell relative h-full">
            <div
                onClick={() => setActive((prev) => true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-start h-full"
            >
                <div
                    className={`flex justify-start gap-1 w-full text-xs ${
                        selectedDeals?.includes(dealId) || dealHover
                            ? "bg-slate-50"
                            : "bg-white"
                    } ${
                        active && !isAdmin && !isPublished
                            ? "items-start flex-wrap h-16 overflow-y-auto absolute top-0 left-0 z-[1] p-1 border border-blue-800"
                            : "items-center h-full border-r px-2 overflow-hidden"
                    }`}
                >
                    {!currentTags ? (
                        <BeatLoader size={7} className="mx-auto" />
                    ) : (
                        currentTags.map((t) => (
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
                                {active && !isAdmin && !isPublished && (
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleRemoveTag(e, t.id)
                                        }
                                        className="p-0.5 cursor-pointer"
                                    >
                                        <Image
                                            src="/remove.svg"
                                            alt="remove"
                                            width={10}
                                            height={10}
                                        />
                                    </button>
                                )}
                            </span>
                        ))
                    )}

                    {active && !isAdmin && !isPublished && (
                        <Button
                            type="button"
                            onClick={() => setOpen((prev) => !prev)}
                            className="flex items-center justify-center size-4 p-0.5 rounded-sm bg-slate-200 hover:bg-slate-300"
                        >
                            <Image
                                src="/plus-lg.svg"
                                alt="plus"
                                width={10}
                                height={10}
                            />
                        </Button>
                    )}
                </div>
            </div>

            {open && !isAdmin && !isPublished && (
                <div
                    ref={listRef}
                    style={{ width: columnWidth }}
                    className="absolute top-16 left-0 z-[5] rounded-md py-2 bg-white border border-gray-300"
                >
                    <input
                        type="text"
                        name="tag"
                        value={tag}
                        placeholder="Введите тэг"
                        onChange={handleItemSearch}
                        className="w-full mb-1 py-1 px-2 text-xs outline-none"
                    />

                    {filteredTags.length > 0 ? (
                        <ul
                            className={`
                                w-full max-h-12 px-2 flex items-center justify-start flex-wrap gap-1 
                                text-xs bg-white overflow-y-auto no-scrollbar
                            `}
                        >
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
