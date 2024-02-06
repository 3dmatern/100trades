export default function BodyCardRiskPublished({ dealRisk, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center w-full h-full relative px-2 text-xs border-r"
            >
                <span className="absolute top-auto right-2">%</span>
                <span className="text-start overflow-hidden whitespace-nowrap text-ellipsis">
                    {dealRisk}
                </span>
            </div>
        </div>
    );
}
