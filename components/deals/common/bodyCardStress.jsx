"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function BodyCardStress({
    dealId,
    dealStress,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
}) {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleMouseOver = (hoveredValue) => {
        setHoveredRating(hoveredValue);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center justify-center h-full px-2 relative border-r text-xs overflow-hidden`}
            >
                <div className="flex items-center justify-start gap-1 w-max absolute top-1/2 -translate-y-1/2 left-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            onMouseOver={() =>
                                isAdmin ? null : handleMouseOver(value)
                            }
                            onMouseLeave={isAdmin ? null : handleMouseLeave}
                            onClick={() =>
                                isAdmin ||
                                (isPending &&
                                    isPending["stress"] &&
                                    dealId === isPending.id)
                                    ? null
                                    : onActionDeal({
                                          id: dealId,
                                          stress: value,
                                      })
                            }
                            className={cn(
                                "block size-2.5 rounded-full bg-slate-200",
                                (value <= hoveredRating && "bg-red-400") ||
                                    (value <= dealStress && "bg-red-600"),
                                !isAdmin && "cursor-pointer"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
