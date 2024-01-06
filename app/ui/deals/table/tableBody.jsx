"use client";

import React from "react";

import CheckboxOrNumber from "./common/checkboxOrNumber";

export default function TableBody({
    deals,
    selectedDeals,
    checkAll,
    onChangeCheckbox,
    onChange,
}) {
    return (
        <div className="bg-white">
            {deals?.map((deal, index) => (
                <div
                    key={deal.id}
                    className={`flext items-center justify-between  ${
                        selectedDeals?.includes(deal.id)
                            ? "bg-slate-50"
                            : "bg-white"
                    } border-b`}
                >
                    <div className="flex items-center w-28">
                        <CheckboxOrNumber
                            number={index + 1}
                            name="deals"
                            value={deal.id}
                            checked={selectedDeals?.includes(deal.id)}
                            checkAll={checkAll}
                            onChange={onChangeCheckbox}
                        />
                        <div className="flex items-center border-r h-8 px-2 text-xs w-4/5">
                            {deal.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
