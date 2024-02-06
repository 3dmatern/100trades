export default function BodyCardStressPublished({ dealStress, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center justify-center h-full px-2 relative border-r text-xs overflow-hidden`}
            >
                <div className="flex items-center justify-start gap-1 w-max absolute top-1/2 -translate-y-1/2 left-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`block size-2.5 rounded-full ${
                                value <= dealStress
                                    ? "bg-red-600"
                                    : "bg-slate-200"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
