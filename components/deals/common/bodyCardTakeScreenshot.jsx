import { cn } from "@/lib/utils";

export default function BodyCardTakeScreenshot({
  takeScreenshot,
  isLoss,
  columnWidth,
  dealImageEndSrc,
}) {
  return (
    <div className="table-cell align-middle h-full">
      <div
        style={{ width: columnWidth, minWidth: "64px" }}
        className="flex items-center justify-center h-full px-2 border-r text-xs"
      >
        <span
          className={cn(
            "whitespace-nowrap text-ellipsis overflow-hidden",
            isLoss && "text-destructive font-bold"
          )}
        >
          {dealImageEndSrc ? "" : takeScreenshot}
        </span>
      </div>
    </div>
  );
}
