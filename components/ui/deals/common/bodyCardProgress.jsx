export default function BodyCardProgress({ dealProgress, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full px-2 border-r text-xs"
            >
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {dealProgress || "0.00"}%
                </span>
            </div>
        </div>
    );
}
