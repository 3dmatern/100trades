"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { createEntrie, getEntries, removeEntrie } from "@/actions/entrie";

import TableBody from "@/components/ui/deals/tableBody";
import TableHead from "@/components/ui/deals/tableHead";
import { Button } from "@/components/ui/button";
import {
    sortByAsc,
    sortByAscDate,
    sortByAscRR,
    sortByAscResult,
    sortByAscString,
    sortByDesc,
    sortByDescDate,
    sortByDescRR,
    sortByDescResult,
    sortByDescString,
} from "@/utils/sortBy";

const initHeaders = [
    { dbName: "name", name: "Тикер", up: false, w: "112px" },
    { dbName: "resultId", name: "Win-Loss", up: true, w: "96px" },
    { dbName: "pose", name: "Поза", up: false, w: "96px" },
    { dbName: "risk", name: "Риск", up: false, w: "70px" },
    { dbName: "profit", name: "Профит", up: false, w: "80px" },
    { dbName: "rrId", name: "R:R", up: true, w: "80px" },
    { dbName: "entryDate", name: "Вход", up: true, w: "144px" },
    { dbName: "imageStart", name: "Скрин", up: true, w: "96px" },
    { dbName: "deposit", name: "Депозит", up: true, w: "112px" },
    { dbName: "progress", name: "Прогресс", up: true, w: "112px" },
    { dbName: "exitDate", name: "Выход", up: true, w: "144px" },
    { dbName: "imageEnd", name: "Скрин2", up: true, w: "96px" },
    { dbName: "take", name: "Пора?", up: false, w: "112px" },
    { dbName: "stress", name: "Стресс", up: true, w: "96px" },
    { dbName: "entrieTag", name: "Tags", up: false, w: "288px" },
    { dbName: "notes", name: "Заметки", up: false, w: "176px" },
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
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

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
        console.log(data);
        setIsSortingEnabled(true);
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

            case "take":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscString(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescString(deals, data.iter),
                      ]);
                break;

            case "notes":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscString(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescString(deals, data.iter),
                      ]);
                break;

            case "resultId":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscResult(deals, data.iter, results),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescResult(deals, data.iter, results),
                      ]);
                break;

            case "pose":
                data.order === "asc"
                    ? setSortedDeals((prev) => [...sortByAsc(deals, data.iter)])
                    : setSortedDeals((prev) => [
                          ...sortByDesc(deals, data.iter),
                      ]);
                break;

            case "risk":
                data.order === "asc"
                    ? setSortedDeals((prev) => [...sortByAsc(deals, data.iter)])
                    : setSortedDeals((prev) => [
                          ...sortByDesc(deals, data.iter),
                      ]);
                break;

            case "profit":
                data.order === "asc"
                    ? setSortedDeals((prev) => [...sortByAsc(deals, data.iter)])
                    : setSortedDeals((prev) => [
                          ...sortByDesc(deals, data.iter),
                      ]);
                break;

            case "rrId":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscRR(deals, data.iter, risksRewards),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescRR(deals, data.iter, risksRewards),
                      ]);
                break;

            case "entryDate":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscDate(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescDate(deals, data.iter),
                      ]);
                break;

            case "exitDate":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscDate(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescDate(deals, data.iter),
                      ]);
                break;

            case "deposit":
                data.order === "asc"
                    ? setSortedDeals((prev) => [...sortByAsc(deals, data.iter)])
                    : setSortedDeals((prev) => [
                          ...sortByDesc(deals, data.iter),
                      ]);
                break;

            case "progress":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscString(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescString(deals, data.iter),
                      ]);
                break;

            case "stress":
                data.order === "asc"
                    ? setSortedDeals((prev) => [...sortByAsc(deals, data.iter)])
                    : setSortedDeals((prev) => [
                          ...sortByDesc(deals, data.iter),
                      ]);
                break;

            case "timeInTrade":
                data.order === "asc"
                    ? setSortedDeals((prev) => [
                          ...sortByAscString(deals, data.iter),
                      ])
                    : setSortedDeals((prev) => [
                          ...sortByDescString(deals, data.iter),
                      ]);
                break;

            default:
                break;
        }
    };

    const resetSort = () => {
        setIsSortingEnabled(false);
        setSortedDeals((prev) =>
            prev.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
        );
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
            className="overflow-x-auto relative"
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

                <div className="flex items-center h-8 relative border-r border-b border-slate-300 bg-white hover:bg-slate-50">
                    <div className="table-cell align-middle h-full sticky left-0 z-[1] bg-white">
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

                        {selectedDeals.length > 0 && (
                            <Button
                                type="button"
                                onClick={handleRmoveDeal}
                                style={{
                                    left: isSortingEnabled
                                        ? `${
                                              parseInt(columnWidth.column1) +
                                              120
                                          }px`
                                        : `${
                                              parseInt(columnWidth.column1) - 70
                                          }px`,
                                }}
                                className="w-max h-7 absolute top-1/2 -translate-y-1/2 bg-red-700 hover:bg-red-600 ml-20 text-sm"
                            >
                                Удалить выбранные сделки
                            </Button>
                        )}

                        {isSortingEnabled && (
                            <Button
                                type="button"
                                onClick={resetSort}
                                style={{
                                    left: `${
                                        parseInt(columnWidth.column1) - 70
                                    }px`,
                                }}
                                className="w-max h-7 absolute top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-300 ml-20 text-sm"
                            >
                                Сбросить сортировку
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
