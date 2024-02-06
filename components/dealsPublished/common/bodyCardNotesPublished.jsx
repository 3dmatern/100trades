export default function BodyCardNotesPublished({ dealNotes, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-start h-full px-2 relative border-r"
            >
                <span className="text-xs whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none">
                    {dealNotes && dealNotes}
                </span>
            </div>
        </div>
    );
}
