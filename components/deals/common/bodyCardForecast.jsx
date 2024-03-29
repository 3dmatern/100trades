"use client";

import { formatPrice } from "@/utils/formattedNumber";

export default function BodyCardForecast({ dealPose, columnWidth }) {
  return (
    <div className="table-cell align-middle h-full">
      <div
        style={{ width: columnWidth, minWidth: "64px" }}
        className="flex items-center w-full h-full px-2 relative text-xs border-r"
      >
        <span>₽</span>
        <span className="pl-1 overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
          {formatPrice(dealPose)}
        </span>
      </div>
    </div>
  );
}
