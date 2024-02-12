"use client";

import React, { useEffect, useState } from "react";

import { CaretUpIcon } from "@/components/icons/caret-up-icon";
import { CaretDownIcon } from "@/components/icons/caret-down-icon";

export default function BodyCardLongShortPublished({
    lsId,
    longShorts,
    columnWidth,
}) {
    const [longShort, setLongShort] = useState(undefined);

    useEffect(() => {
        if (lsId && longShorts) {
            setLongShort(longShorts.find((item) => item.id === lsId));
        }
    }, [lsId, longShorts]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center h-full px-2 relative border-r border-slate-300"
            >
                {longShort ? (
                    <span
                        style={{ color: longShort.value }}
                        className="text-center"
                    >
                        {longShort.label === "long" ? (
                            <CaretUpIcon />
                        ) : (
                            <CaretDownIcon />
                        )}
                    </span>
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
