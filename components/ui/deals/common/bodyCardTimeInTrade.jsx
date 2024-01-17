"use client";

import { useEffect, useState } from "react";

export default function BodyCardTimeInTrade({
    dealEntryDate,
    dealExitDate,
    columnWidth,
    getTimeInTrade,
}) {
    const [time, setTime] = useState("");

    useEffect(() => {
        if (dealEntryDate || dealExitDate) {
            let result = getTimeInTrade(dealEntryDate, dealExitDate);
            setTime(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealEntryDate, dealExitDate]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full px-2 border-r text-xs overflow-hidden"
            >
                <span className="whitespace-nowrap text-ellipsis">{time}</span>
            </div>
        </div>
    );
}
