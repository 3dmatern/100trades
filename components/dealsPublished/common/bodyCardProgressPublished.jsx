export default function BodyCardProgressPublished({
    dealProgress,
    columnWidth,
}) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full px-2 border-r text-xs"
            >
                <span
                    className={`${
                        dealProgress > 0
                            ? "text-emerald-500"
                            : !dealProgress || parseFloat(dealProgress) === 0
                            ? ""
                            : "text-red-600"
                    } overflow-hidden whitespace-nowrap text-ellipsis`}
                >
                    {dealProgress || "0.00"}%
                </span>
            </div>
        </div>
    );
}
