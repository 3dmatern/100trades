"use client";

import React, { useState } from "react";

export default function BodyCardStress({ dealStress }) {
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
        <div className="flex items-center justify-start gap-1 border-r w-24 min-w-4 h-8 px-2 text-xs">
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
    );
}
