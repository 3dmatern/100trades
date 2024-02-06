"use client";

import React, { useEffect, useState } from "react";

export default function BodyCardResultPublished({
    resultId,
    results,
    columnWidth,
}) {
    const [result, setResult] = useState(undefined);

    useEffect(() => {
        if (resultId && results) {
            setResult(results.find((item) => item.id === resultId));
        }
    }, [resultId, results]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center h-full px-2 relative border-r border-slate-300"
            >
                {result ? (
                    <span
                        style={{ backgroundColor: result.value }}
                        className="inline-block py-1 px-2 rounded-xl text-xs uppercase overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                        {result.label}
                    </span>
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
