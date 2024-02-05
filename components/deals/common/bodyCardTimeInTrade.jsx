"use client";

export default function BodyCardTimeInTrade({ timeInTrade, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full px-2 border-r text-xs overflow-hidden"
            >
                <span className="whitespace-nowrap text-ellipsis">
                    {timeInTrade && timeInTrade + "ч."}
                </span>
            </div>
        </div>
    );
}
