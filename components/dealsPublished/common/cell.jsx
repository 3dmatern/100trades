export default function Cell({ columnWidth, children }) {
    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className="table-cell align-middle h-full"
        >
            <div className="flex items-center justify-center gap-0.5 h-full text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                {children}
            </div>
        </div>
    );
}
