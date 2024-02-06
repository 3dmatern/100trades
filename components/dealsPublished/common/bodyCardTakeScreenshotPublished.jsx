export default function BodyCardTakeScreenshotPublished({
    takeScreenshot,
    columnWidth,
    dealImageEndSrc,
}) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full px-2 border-r text-xs"
            >
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                    {dealImageEndSrc ? "" : takeScreenshot}
                </span>
            </div>
        </div>
    );
}
