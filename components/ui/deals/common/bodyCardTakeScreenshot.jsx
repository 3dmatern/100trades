export default function BodyCardTakeScreenshot({
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
                <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                    {dealImageEndSrc
                        ? ""
                        : takeScreenshot
                        ? "Сделай скрин"
                        : "Рано"}
                </span>
            </div>
        </div>
    );
}