export default function BodyCardInfoAction({
    dealEntryDate,
    dealExitDate,
    columnWidth,
    timeScreenshot,
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
                        : dealExitDate - dealEntryDate > timeScreenshot
                        ? "Сделай скрин"
                        : "Рано"}
                </span>
            </div>
        </div>
    );
}
