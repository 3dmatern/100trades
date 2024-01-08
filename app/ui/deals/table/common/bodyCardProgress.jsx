export default function BodyCardProgress({ dealProgress, columnWidth }) {
    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className="flex items-center justify-center border-r h-8 px-2 text-xs"
        >
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                {dealProgress || "0.00"}%
            </span>
        </div>
    );
}
