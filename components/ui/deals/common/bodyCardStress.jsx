"use client";

import React, { useState } from "react";

export default function BodyCardStress({ dealStress, columnWidth }) {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleMouseOver = (hoveredValue) => {
        setHoveredRating(hoveredValue);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (selectedValue) => {
        setRating(selectedValue);
    };

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className="relative border-r h-8 px-2 text-xs overflow-hidden"
        >
            <div className="flex items-center justify-start gap-1 w-max absolute top-1/2 -translate-y-1/2 left-2">
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        onMouseOver={() => handleMouseOver(value)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(value)}
                        className={`block size-2.5 rounded-full cursor-pointer ${
                            value <= hoveredRating
                                ? "bg-red-400"
                                : value <= dealStress
                                ? "bg-red-600"
                                : "bg-slate-200"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
