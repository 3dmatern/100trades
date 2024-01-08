"use client";

import { useEffect, useState } from "react";

export default function BodyCardTimeInTrade({
    dealEntryDate,
    dealExitDate,
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
        <div className="flex items-center justify-center flex-nowrap border-r w-32 min-w-4 h-8 px-2 text-xs">
            {time}
        </div>
    );
}
