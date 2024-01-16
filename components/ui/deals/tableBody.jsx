"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";
import { Button } from "@/components/ui/button";

export default function TableBody({
    userId,
    sheetId,
    deals,
    selectedDeals,
    results,
    risksRewards,
    tags,
    checkAll,
    columnWidth,
    onCheckDeal,
    onCreateDeal,
}) {
    const [loader, setLoader] = useState(<BeatLoader size={8} />);

    useEffect(() => {
        if (!deals && deals.length === 0) {
            const timer = setTimeout(() => {
                setLoader(
                    <p className="text-xl font-semibold drop-shadow-md">
                        Записей нет...
                    </p>
                );
            }, 3000);
            return clearTimeout(timer);
        }
    }, [deals]);

    return (
        <div className="bg-white" style={{ height: "calc(100vh - 250px)" }}>
            {deals.length === 0 ? (
                <div className="flex items-center justify-center h-8 border">
                    {loader}
                </div>
            ) : (
                deals?.map((deal, index) => (
                    <TableBodyCard
                        key={deal.id}
                        userId={userId}
                        sheetId={sheetId}
                        index={index}
                        deal={deal}
                        selectedDeals={selectedDeals}
                        results={results}
                        risksRewards={risksRewards}
                        tags={tags}
                        checkAll={checkAll}
                        columnWidth={columnWidth}
                        onCheckDeal={onCheckDeal}
                    />
                ))
            )}
            <div
                className={`flex items-center h-8 bg-white hover:bg-slate-50 border-r border-b`}
            >
                <div
                    style={{ width: columnWidth.column1 }}
                    className="flex items-center sticky top-0 left-0 border-l border-r"
                >
                    <Button
                        type="button"
                        onClick={onCreateDeal}
                        className="flex items-center justify-center size-7 p-1 rounded-sm bg-slate-50 hover:bg-slate-200"
                    >
                        <Image
                            src="./plus-lg.svg"
                            alt="plus"
                            width={16}
                            height={16}
                        />
                    </Button>
                </div>

                {selectedDeals.length > 0 && (
                    <Button
                        type="button"
                        className="w-max bg-red-700 hover:bg-red-600 ml-20 text-sm"
                    >
                        Удалить выбранные сделки
                    </Button>
                )}
            </div>
        </div>
    );
}
