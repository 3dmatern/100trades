"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    createEntrie,
    getEntries,
    removeEntrie,
    updateEntrie,
} from "@/actions/entrie";

import TableBody from "@/components/ui/deals/tableBody";
import TableHead from "@/components/ui/deals/tableHead";
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
import {
    progress,
    resetEveryonesProgress,
    updateEveryonesProgress,
} from "@/utils/operationsWithProgress";
import AddTableRow from "./addTableRow";
import TableInfo from "./tableInfo";

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
    resultsData,
    risksRewarsData,
    tagsData,
}) {
    const [deals, setDeals] = useState([]);
    const [results, setResults] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allRRs, setAllRRs] = useState([]);
    const [isPending, setIsPending] = useState(undefined);
    const [checkAll, setCheckAll] = useState(false);
    const [columnWidth, setColumnWidth] = useState(initColumnWidth);
    const [selectedDeals, setSelectedDeals] = useState([]);
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

    const changeAllRRs = (rr) => {
        setAllRRs((prev) => [...prev, rr]);
    };

    const handleUpdateAllTags = (tags) => {
        setAllTags([...tags]);
    };

    const handleCheckAll = () => {
        setCheckAll((prev) => {
            !prev
                ? setSelectedDeals(deals.map((deal) => deal.id))
                : setSelectedDeals([]);
            return !prev;
        });
    };

    const handleCheckDeal = ({ target }) => {
        setSelectedDeals((prev) => {
            let prevCopy = prev.slice();

            if (prevCopy.includes(target.value)) {
                prevCopy = prevCopy.filter((item) => item !== target.value);
            } else {
                prevCopy = [...prevCopy, target.value];
            }

            if (prevCopy.length === 0) {
                setCheckAll(false);
            }

            return prevCopy;
        });
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

    const handleUpdateDeal = async (values) => {
        setIsPending((prev) => values);
        const dealIndex = deals.findIndex((d) => d.id === values.id);

        try {
            const firstDeal = deals.reduce((minDeal, currentDeal) => {
                if (
                    !minDeal ||
                    new Date(currentDeal.date) < new Date(minDeal.date)
                ) {
                    return currentDeal;
                }
                return minDeal;
            }, null);

            if (
                values.deposit &&
                firstDeal &&
                firstDeal.deposit &&
                values.id !== firstDeal.id
            ) {
                values.progress = progress(values.deposit, firstDeal.deposit);
            } else if (values.id === firstDeal.id && values.deposit === "") {
                await resetEveryonesProgress(
                    deals,
                    values,
                    updateEntrie,
                    userId,
                    sheetId,
                    toast,
                    setDeals
                );
            } else if (
                values.id === firstDeal.id &&
                values.deposit &&
                values.deposit !== ""
            ) {
                await updateEveryonesProgress(
                    deals,
                    progress,
                    values,
                    updateEntrie,
                    userId,
                    sheetId,
                    toast,
                    setDeals
                );
            } else if (
                dealIndex !== -1 &&
                !Object.keys(values).includes("deposit")
            ) {
                const findDealProgress = deals[dealIndex].progress;
                values.progress = findDealProgress ? findDealProgress : "";
            } else if (values.deposit === "") {
                values.progress = "";
            }

            const data = await updateEntrie(userId, {
                ...values,
                sheetId,
            });

            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                toast.success(data.success);

                const { payload } = data;

                setDeals((prev) => {
                    const updatedDeals = [...prev];
                    const findIndexDealOfDeals = updatedDeals.findIndex(
                        (d) => d.id === payload.id
                    );

                    if (findIndexDealOfDeals !== -1) {
                        updatedDeals[findIndexDealOfDeals] = payload;
                    }

                    return updatedDeals;
                });
            }
        } catch (error) {
            toast.error("Ошибка обновления сделки!");
        }

        setIsPending(undefined);
    };

    const handleRmoveDeal = async () => {
        let removedDeal = [];
        let copyDeals = deals;
        let copySelectedDeals = selectedDeals;
        setSelectedDeals([]);

        setDeals((prev) =>
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
            setSelectedDeals(removedDeal);
        }

        toast.success(
            `Удалено записей ${successLength} из ${allRemoved.length}`
        );

        setCheckAll(false);
    };

    const handleSort = (data) => {
        setIsSortingEnabled(true);

        const sortByOrderString = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscString(prev, iter)]
                    : [...sortByDescString(prev, iter)]
            );
        };

        const sortByOrderNumber = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAsc(prev, iter)]
                    : [...sortByDesc(prev, iter)]
            );
        };

        const sortByOrderResult = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscResult(prev, iter, results)]
                    : [...sortByDescResult(prev, iter, results)]
            );
        };

        const sortByOrderRR = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscRR(prev, iter, risksRewards)]
                    : [...sortByDescRR(prev, iter, risksRewards)]
            );
        };

        const sortByOrderDate = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscDate(prev, iter)]
                    : [...sortByDescDate(prev, iter)]
            );
        };

        switch (data.iter) {
            case "name":
            case "take":
            case "notes":
            case "progress":
                sortByOrderString(data);
                break;

            case "pose":
            case "risk":
            case "profit":
            case "deposit":
            case "stress":
            case "timeInTrade":
                sortByOrderNumber(data);
                break;

            case "resultId":
                sortByOrderResult(data);
                break;

            case "rrId":
                sortByOrderRR(data);
                break;

            case "entryDate":
            case "exitDate":
                sortByOrderDate(data);
                break;

            default:
                break;
        }
    };

    const handleResetSort = () => {
        setIsSortingEnabled(false);
        setDeals((prev) =>
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
        if (resultsData) {
            if (resultsData.error) {
                toast.error(resultsData.error);
                return;
            }
            setResults(resultsData);
        }
    }, [resultsData]);

    useEffect(() => {
        if (risksRewarsData) {
            if (risksRewarsData.error) {
                toast.error(risksRewarsData.error);
                return;
            }
            setAllRRs(risksRewarsData);
        }
    }, [risksRewarsData]);

    useEffect(() => {
        if (tagsData) {
            if (tagsData.error) {
                toast.error(tagsData.error);
                return;
            }
            setAllTags(tagsData);
        }
    }, [tagsData]);

    return (
        <div className="flex-1 h-full relative overflow-x-auto">
            <div className="table w-max h-full border-collapse">
                <TableInfo
                    columnWidth={columnWidth}
                    deals={deals}
                    results={results}
                />
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
                    deals={deals}
                    selectedDeals={selectedDeals}
                    results={results}
                    allRRs={allRRs}
                    onChangeAllRRs={changeAllRRs}
                    allTags={allTags}
                    onUpdateAllTags={handleUpdateAllTags}
                    columnWidth={columnWidth}
                    onCheckDeal={handleCheckDeal}
                    isPending={isPending}
                    onUpdateDeal={handleUpdateDeal}
                />

                <AddTableRow
                    columnWidth={columnWidth}
                    onCreateDeal={handleCreateDeal}
                    selectedDeals={selectedDeals}
                    onRmoveDeal={handleRmoveDeal}
                    isSortingEnabled={isSortingEnabled}
                    onResetSort={handleResetSort}
                />
            </div>
        </div>
    );
}
