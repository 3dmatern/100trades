"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { createEntrie, getEntries } from "@/actions/entrie";

import TableBody from "@/components/ui/deals/tableBody";
import TableHead from "@/components/ui/deals/tableHead";
import { Button } from "@/components/ui/button";

const initHeaders = [
    { name: "Тикер", up: false, w: "112px" },
    { name: "Win-Loss", up: true, w: "96px" },
    { name: "Поза", up: false, w: "96px" },
    { name: "Риск", up: false, w: "70px" },
    { name: "Профит", up: false, w: "80px" },
    { name: "R:R", up: true, w: "80px" },
    { name: "Вход", up: true, w: "144px" },
    { name: "Скрин", up: true, w: "96px" },
    { name: "Депозит", up: true, w: "112px" },
    { name: "Прогресс", up: true, w: "112px" },
    { name: "Выход", up: true, w: "144px" },
    { name: "Скрин2", up: true, w: "96px" },
    { name: "Пора?", up: false, w: "112px" },
    { name: "Стресс", up: true, w: "96px" },
    { name: "Tags", up: false, w: "288px" },
    { name: "Заметки", up: false, w: "176px" },
    { name: "Время в сделке", up: true, w: "128px" },
];

const initColumnWidth = {
    column1: "112px",
    column2: "105px",
    column3: "96px",
    column4: "70px",
    column5: "80px",
    column6: "80px",
    column7: "144px",
    column8: "96px",
    column9: "112px",
    column10: "112px",
    column11: "144px",
    column12: "96px",
    column13: "112px",
    column14: "96px",
    column15: "288px",
    column16: "176px",
    column17: "128px",
};

export default function Table({
    userId,
    sheetId,
    results,
    risksRewards,
    tags,
}) {
    const tableRef = useRef(null);
    const [heightTop, setHeightTop] = useState(0);

    const [deals, setDeals] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [columnWidth, setColumnWidth] = useState(initColumnWidth);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleCheckAll = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => {
                !prev
                    ? setSelectedDeals(deals.map((deal) => deal.id))
                    : setSelectedDeals([]);
                return !prev;
            });
        }
    };

    const handleCheckDeal = ({ target }) => {
        setSelectedDeals((prev) =>
            !prev.includes(target.value)
                ? [...prev, target.value]
                : prev.filter((item) => item !== target.value)
        );
    };

    const handleResize = (column, newWidth) => {
        setColumnWidth((prevWidths) => ({
            ...prevWidths,
            [column]: newWidth,
        }));
    };

    const handleCreateDeal = async () => {
        await createEntrie({ userId, sheetId }).then((data) => {
            if (data.error) {
                toast.error(data.error);
            }
            if (data.success) {
                setDeals((prev) => [...prev, data.newEntrie]);
                toast.success(data.success);
            }
        });
    };

    useEffect(() => {
        if (sheetId) {
            const entries = async () => {
                const result = await getEntries(sheetId).then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    return data;
                });
                setDeals(result);
            };
            entries();
        }
    }, [sheetId]);

    useEffect(() => {
        const calculateDistance = () => {
            if (tableRef.current) {
                const { top } = tableRef.current.getBoundingClientRect();
                setHeightTop(top);
            }
        };
        calculateDistance();

        const handleResizeScreen = () => {
            calculateDistance();
        };

        window.addEventListener("resize", handleResizeScreen);
        return () => {
            window.removeEventListener("resize", handleResizeScreen);
        };
    }, [tableRef]);

    return (
        <div
            ref={tableRef}
            style={{ height: `calc(100vh - ${heightTop}px)` }}
            className="overflow-x-auto"
        >
            <div ref={tableRef} className="table w-max border-collapse">
                <TableHead
                    initHeaders={initHeaders}
                    checkAll={checkAll}
                    columnWidth={columnWidth}
                    onResize={handleResize}
                    onCheckAll={handleCheckAll}
                />

                {deals.length > 0 && (
                    <TableBody
                        userId={userId}
                        sheetId={sheetId}
                        deals={deals}
                        selectedDeals={selectedDeals}
                        results={results}
                        risksRewards={risksRewards}
                        tags={tags}
                        checkAll={checkAll}
                        columnWidth={columnWidth}
                        onCheckDeal={handleCheckDeal}
                        onCreateDeal={handleCreateDeal}
                    />
                )}

                <div className="flex items-center h-8 border-r border-b border-slate-300 bg-white hover:bg-slate-50">
                    <div className="table-cell align-middle h-full sticky left-0 z-[1]">
                        <div
                            style={{
                                width: columnWidth.column1,
                                minWidth: "64px",
                            }}
                            className="flex items-center h-full border-l border-r border-slate-300 bg-inherit hover:bg-inherit"
                        >
                            <Button
                                type="button"
                                onClick={handleCreateDeal}
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
                    </div>

                    {selectedDeals.length > 0 && (
                        <Button
                            type="button"
                            className="w-max h-full bg-red-700 hover:bg-red-600 ml-20 text-sm"
                        >
                            Удалить выбранные сделки
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
