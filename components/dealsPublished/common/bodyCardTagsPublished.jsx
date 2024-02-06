"use client";

import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function BodyCardTagsPublished({
    dealId,
    allTags,
    entrieTag,
    columnWidth,
    dealHover,
    determineTextColor,
}) {
    const [currentTags, setCurrentTags] = useState(null);

    useEffect(() => {
        if (allTags && dealId && entrieTag) {
            setCurrentTags(
                allTags.filter((tag) =>
                    entrieTag.some((t) => t.tagId === tag.id)
                )
            );
        }
    }, [allTags, dealId, entrieTag]);

    return (
        <div className="table-cell relative h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-start h-full"
            >
                <div
                    className={`flex justify-start gap-1 w-full text-xs ${
                        dealHover ? "bg-slate-50" : "bg-white"
                    } items-center h-full border-r px-2 overflow-hidden`}
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
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
