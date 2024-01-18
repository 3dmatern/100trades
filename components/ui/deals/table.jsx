"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { createEntrie, getEntries, removeEntrie } from "@/actions/entrie";

import TableBody from "@/components/ui/deals/tableBody";
import TableHead from "@/components/ui/deals/tableHead";
import { Button } from "@/components/ui/button";
import { sortByAscString, sortByDescString } from "@/utils/sortBy";

const initHeaders = [
    { dbName: "name", name: "Тикер", up: false, w: "112px" },
    { dbName: "pose", name: "Win-Loss", up: true, w: "96px" },
    { dbName: "risk", name: "Поза", up: false, w: "96px" },
    { dbName: "profit", name: "Риск", up: false, w: "70px" },
    { dbName: "entryDate", name: "Профит", up: false, w: "80px" },
    { dbName: "imageStart", name: "R:R", up: true, w: "80px" },
    { dbName: "deposit", name: "Вход", up: true, w: "144px" },
    { dbName: "exitDate", name: "Скрин", up: true, w: "96px" },
    { dbName: "imageEnd", name: "Депозит", up: true, w: "112px" },
    { dbName: "progress", name: "Прогресс", up: true, w: "112px" },
    { dbName: "stress", name: "Выход", up: true, w: "144px" },
    { dbName: "notes", name: "Скрин2", up: true, w: "96px" },
    { dbName: "take", name: "Пора?", up: false, w: "112px" },
    { dbName: "resultId", name: "Стресс", up: true, w: "96px" },
    { dbName: "rrId", name: "Tags", up: false, w: "288px" },
    { dbName: "entrieTag", name: "Заметки", up: false, w: "176px" },
    { dbName: "timeInTrade", name: "Время в сделке", up: true, w: "128px" },
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
    const [sortedDeals, setSortedDeals] = useState(null);
    const [checkAll, setCheckAll] = useState(false);
    const [columnWidth, setColumnWidth] = useState(initColumnWidth);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleCheckAll = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => {
                !prev
                    ? setSelectedDeals(sortedDeals.map((deal) => deal.id))
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
                setSortedDeals((prev) => [...prev, data.newEntrie]);
                toast.success(data.success);
            }
        });
    };

    const handleRmoveDeal = async () => {
        let removedDeal = [];
        let copyDeals = sortedDeals;
        let copySelectedDeals = selectedDeals;
        setSelectedDeals([]);

        setDeals((prev) =>
            prev.filter((deal) => !copySelectedDeals.includes(deal.id))
        );
        setSortedDeals((prev) =>
            prev.filter((deal) => !copySelectedDeals.includes(deal.id))
        );

        const allRemoved = await Promise.all(
            copySelectedDeals.map(
                async (dealId) =>
                    await removeEntrie({ userId, sheetId, entrieId: dealId })
            )
        );

        const successLength = allRemoved.map((i) => {
            removedDeal.push(i.id);
            return i.success;
        }).length;

        removedDeal = copySelectedDeals.filter((d) => !removedDeal.includes(d));
        if (removedDeal.length > 0) {
            setDeals((prev) => [
                ...prev,
                ...copyDeals.filter((c) => removedDeal.includes(c.id)),
            ]);
            setSortedDeals((prev) => [
                ...prev,
                ...copyDeals.filter((c) => removedDeal.includes(c.id)),
            ]);
            setSelectedDeals(removedDeal);
        }

        toast.success(
            `Удалено записей ${successLength} из ${allRemoved.length}`
        );
    };

    const handleSort = (data) => {
        switch (data.iter) {
            case "name":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscString(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescString(deals, data.iter),
                      ]);
                break;
            case "result":
                data.order === "asc"
                    ? setSortedDeals(sortByAscString(deals))
                    : setSortedDeals(sortByDescString(deals));
                break;

            default:
                break;
        }
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
        if (deals) {
            setSortedDeals(deals);
        }
    }, [deals]);

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
            <div className="table w-max border-collapse">
                <TableHead
                    initHeaders={initHeaders}
                    checkAll={checkAll}
                    columnWidth={columnWidth}
                    onResize={handleResize}
                    onCheckAll={handleCheckAll}
                    onSort={handleSort}
                />

                <TableBody
                    userId={userId}
                    sheetId={sheetId}
                    sortedDeals={sortedDeals}
                    selectedDeals={selectedDeals}
                    results={results}
                    risksRewards={risksRewards}
                    tags={tags}
                    checkAll={checkAll}
                    columnWidth={columnWidth}
                    onCheckDeal={handleCheckDeal}
                />

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
                                    src="/plus-lg.svg"
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
                            onClick={handleRmoveDeal}
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
