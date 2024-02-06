"use client";

export default function BodyCardNamePublished({
    index,
    dealName,
    dealHover,
    columnWidth,
}) {
    return (
        <div className="table-cell align-middle h-full sticky left-0 z-[2]">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center h-full px-2
                        border-l border-r border-slate-300
                ${dealHover ? "bg-slate-50" : "bg-white"}`}
            >
                <span className="text-xs px-1">{index + 1}</span>
                <span
                    className={`flex items-center justify-start h-7 p-0 pl-3 text-xs ${
                        !dealName && "text-gray-500"
                    } overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none`}
                >
                    {dealName || "AAAA"}
                </span>
            </div>
        </div>
    );
}
