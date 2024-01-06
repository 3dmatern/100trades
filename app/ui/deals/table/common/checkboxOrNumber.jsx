"use client";

import React, { useState } from "react";

export default function CheckboxOrNumber({
    number,
    name,
    value,
    checked,
    checkAll,
    onChange,
}) {
    const [move, setMove] = useState(false);

    return (
        <div
            onMouseEnter={() => setMove(true)}
            onMouseLeave={() => setMove(false)}
            className="flex items-center justify-center size-8 hover:bg-slate-100"
        >
            {number && !move && !checkAll && !checked ? (
                <p className="text-xs">{number}</p>
            ) : (
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checkAll ? true : checked}
                    onChange={onChange}
                    className="cursor-pointer"
                />
            )}
        </div>
    );
}
