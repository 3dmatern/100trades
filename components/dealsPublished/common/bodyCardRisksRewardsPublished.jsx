"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardRisksRewardsPublished({
    rrId,
    allRRs,
    columnWidth,
    determineTextColor,
}) {
    const [currentRR, setCurrentRR] = useState(undefined);

    useEffect(() => {
        if (rrId && allRRs) {
            setCurrentRR(allRRs.find((item) => item.id === rrId));
        }
    }, [allRRs, rrId]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center h-full px-2 relative text-xs border-r"
            >
                <span
                    style={
                        currentRR
                            ? {
                                  color: determineTextColor(currentRR.value),
                                  backgroundColor: currentRR.value,
                              }
                            : null
                    }
                    className="rounded-xl px-2 overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    {currentRR?.label}
                </span>
            </div>
        </div>
    );
}
