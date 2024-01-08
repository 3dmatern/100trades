export default function BodyCardInfoAction({
    dealEntryDate,
    dealExitDate,
    dealTimeScreenshot,
    dealImageEndSrc,
}) {
    return (
        <div className="flex items-center justify-center flex-nowrap border-r w-28 min-w-4 h-8 px-2 text-xs">
            {dealImageEndSrc
                ? ""
                : +dealExitDate - +dealEntryDate > dealTimeScreenshot
                ? "Сделай скрин"
                : "Рано"}
        </div>
    );
}
