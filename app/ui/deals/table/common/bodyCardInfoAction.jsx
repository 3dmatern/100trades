export default function BodyCardInfoAction({
    dealEntryDate,
    dealExitDate,
    columnWidth,
    timeScreenshot,
    dealImageEndSrc,
}) {
    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className="flex items-center justify-center flex-nowrap border-r h-8 px-2 text-xs"
        >
            <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                {dealImageEndSrc
                    ? ""
                    : dealExitDate - dealEntryDate > timeScreenshot
                    ? "Сделай скрин"
                    : "Рано"}
            </span>
        </div>
    );
}
