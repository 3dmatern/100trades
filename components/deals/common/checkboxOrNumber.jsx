"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function CheckboxOrNumber({
    number,
    name,
    value,
    checked,
    onChange,
    isAdmin,
    isModal,
    className,
}) {
    const [move, setMove] = useState(false);

    return (
        <div
            onMouseEnter={() => setMove(true)}
            onMouseLeave={() => setMove(false)}
            className={cn(
                "flex items-center justify-center size-8",
                !isAdmin && "hover:bg-slate-100",
                className
            )}
        >
            {(number && !move && !checked) || isAdmin || isModal ? (
                <p className="text-xs">{number}</p>
            ) : (
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="cursor-pointer"
                />
            )}
        </div>
    );
}
