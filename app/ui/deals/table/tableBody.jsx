"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import CheckboxOrNumber from "./common/checkboxOrNumber";

export default function TableBody({
    deals,
    selectedDeals,
    checkAll,
    onChangeCheckbox,
    onChange,
}) {
    return (
        <div className="bg-white" style={{ height: "calc(100vh - 155px)" }}>
            {deals?.map((deal, index) => (
                <div
                    key={deal.id}
                    className={`flex items-center ${
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

                    <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs uppercase">
                        {deal.effect === "win" && (
                            <span className="inline-block py-1 px-2 bg-green-300 rounded-xl">
                                win
                            </span>
                        )}
                        {deal.effect === "active" && (
                            <span className="inline-block py-1 px-2 bg-orange-300 rounded-xl">
                                активна
                            </span>
                        )}
                        {deal.effect === "noLoss" && (
                            <span className="inline-block py-1 px-2 bg-gray-300 rounded-xl">
                                бу
                            </span>
                        )}
                        {deal.effect === "loss" && (
                            <span className="inline-block py-1 px-2 bg-red-300 rounded-xl">
                                loss
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-center border-r w-20 min-w-4 h-8 px-2 text-xs">
                        <span>₽{deal.pose}</span>
                    </div>

                    <div className="flex items-center justify-center border-r w-16 min-w-4 h-8 px-2 text-xs">
                        <span>{deal.risk && deal.risk + "%"}</span>
                    </div>

                    <div className="flex items-center justify-center border-r w-16 min-w-4 h-8 px-2 text-xs">
                        <span
                            style={{ backgroundColor: deal.lp.value }}
                            className="rounded-xl px-2"
                        >
                            {deal.lp.label}
                        </span>
                    </div>

                    <div className="flex items-center justify-center border-r w-32 min-w-4 h-8 px-2 text-xs">
                        {`${new Date(deal.entry).getMonth() + 1}/${new Date(
                            deal.entry
                        ).getDate()}/${new Date(
                            deal.entry
                        ).getFullYear()}  ${new Date(
                            deal.entry
                        ).getHours()}:${new Date(deal.entry).getMinutes()}`}
                    </div>

                    <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs">
                        {deal.screenStart && (
                            <Image
                                src={`/${deal.screenStart}`}
                                alt="screen start"
                                width={49}
                                height={25}
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-center border-r w-28 min-w-4 h-8 px-2 text-xs">
                        {deal.deposit}
                    </div>

                    <div className="flex items-center justify-center border-r w-28 min-w-4 h-8 px-2 text-xs">
                        {deal.progress}%
                    </div>

                    <div className="flex items-center justify-center border-r w-32 min-w-4 h-8 px-2 text-xs">
                        {deal.exit
                            ? `${new Date(deal.exit).getMonth() + 1}/${new Date(
                                  deal.exit
                              ).getDate()}/${new Date(
                                  deal.exit
                              ).getFullYear()}  ${new Date(
                                  deal.exit
                              ).getHours()}:${new Date(deal.exit).getMinutes()}`
                            : ""}
                    </div>

                    <div className="flex items-center justify-center border-r w-24 min-w-4 h-8 px-2 text-xs">
                        {deal.screenEnd && (
                            <Image
                                src={`/${deal.screenEnd}`}
                                alt="screen end"
                                width={49}
                                height={25}
                            />
                        )}
                    </div>

                    <div className="flex items-center justify-center border-r w-28 min-w-4 h-8 px-2 text-xs">
                        {new Date(+deal.exit - +deal.entry).getMinutes() >
                        deal.timeForScreenEnd
                            ? "Сделай скрин"
                            : "Рано"}
                    </div>

                    <div className="flex items-center justify-center border-r w-28 min-w-4 h-8 px-2 text-xs">
                        {deal.stress}
                    </div>

                    <div className="flex items-center justify-start gap-1 flex-nowrap border-r w-72 min-w-4 h-8 px-2 text-xs">
                        {deal.tags?.map((tag) => (
                            <span
                                key={tag.label}
                                style={{ backgroundColor: tag.value }}
                                className="rounded-xl px-2 py-0.5"
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-center flex-nowrap border-r w-44 min-w-4 h-8 px-2 text-xs">
                        {deal.notes}
                    </div>

                    <div className="flex items-center justify-center flex-nowrap border-r w-32 min-w-4 h-8 px-2 text-xs">
                        {deal.timeInTrade ? deal.timeInTrade : "NaN"}
                    </div>

                    <div className="flex items-center justify-center flex-nowrap border-r w-32 min-w-4 h-8 px-2 text-xs">
                        {deal.timeForScreenEnd ? deal.timeForScreenEnd : "NaN"}
                    </div>
                </div>
            ))}
        </div>
    );
}
