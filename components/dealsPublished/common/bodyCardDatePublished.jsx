import { dealDateWithTime } from "@/utils/formatedDate";

export default function BodyCardDatePublished({ dealDate, columnWidth }) {
    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center justify-center h-full text-xs overflow-hidden border-r px-2"
            >
                <span className="overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
                    {dealDate && dealDateWithTime(dealDate)}
                </span>
            </div>
        </div>
    );
}
