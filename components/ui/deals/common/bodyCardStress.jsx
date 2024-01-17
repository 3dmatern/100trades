"use client";

import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { updateEntrie } from "@/actions/entrie";

export default function BodyCardStress({
    userId,
    sheetId,
    dealId,
    dealStress,
    columnWidth,
}) {
    const [isPending, startTransition] = useTransition();
    const [hoveredRating, setHoveredRating] = useState(0);
    const [stress, setStress] = useState(0);

    const handleMouseOver = (hoveredValue) => {
        setHoveredRating(hoveredValue);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (selectedValue) => {
        setStress(selectedValue);
        startTransition(() => {
            updateEntrie({
                userId,
                values: { id: dealId, sheetId, stress: selectedValue },
            })
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    useEffect(() => {
        if (dealStress) {
            setStress(dealStress);
        }
    }, [dealStress]);

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
                            onMouseOver={() => handleMouseOver(value)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() =>
                                isPending ? {} : handleClick(value)
                            }
                            className={`block size-2.5 rounded-full cursor-pointer ${
                                value <= hoveredRating
                                    ? "bg-red-400"
                                    : value <= stress
                                    ? "bg-red-600"
                                    : "bg-slate-200"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
