"use client";

import React, { useEffect, useState } from "react";

import { formatPrice } from "@/utils/formattedNumber";

export default function BodyCardDepositPublished({ dealDeposit, columnWidth }) {
    const [deposit, setDeposit] = useState("");

    useEffect(() => {
        if (dealDeposit) {
            const formattedPrice = formatPrice(dealDeposit);
            setDeposit(formattedPrice);
        }
    }, [dealDeposit]);

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className="flex items-center w-full h-full px-2 relative text-xs border-r"
            >
                <span>₽</span>
                <span className="pl-1 overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
                    {deposit}
                </span>
            </div>
        </div>
    );
}
