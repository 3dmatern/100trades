"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    createEntrie,
    getEntries,
    removeEntrie,
    updateEntrie,
} from "@/actions/entrie";

import TableBody from "@/components/deals/tableBody";
import TableHead from "@/components/deals/tableHead";
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
import AddTableRow from "@/components/deals/addTableRow";
import TableInfo from "@/components/deals/tableInfo";
import { COLUMN_WIDTH } from "@/components/constants";
import { useLongShort } from "@/hooks/use-long-short";

export default function Table({
    userId,
    sheetId,
    resultsData,
    risksRewarsData,
    tagsData,
    isAdmin = false,
}) {
    const { longShorts } = useLongShort();
    const [deals, setDeals] = useState([]);
    const [results, setResults] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allRRs, setAllRRs] = useState([]);
    const [isPending, setIsPending] = useState(undefined);
    const [checkAll, setCheckAll] = useState(false);
    const [columnWidth, setColumnWidth] = useState(COLUMN_WIDTH);
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
        console.log(values);
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
                    checkAll={checkAll}
                    columnWidth={columnWidth}
                    onResize={handleResize}
                    onCheckAll={handleCheckAll}
                    onSort={handleSort}
                    isAdmin={isAdmin}
                />

                <TableBody
                    userId={userId}
                    sheetId={sheetId}
                    deals={deals}
                    selectedDeals={selectedDeals}
                    results={results}
                    longShorts={longShorts}
                    allRRs={allRRs}
                    onChangeAllRRs={changeAllRRs}
                    allTags={allTags}
                    onUpdateAllTags={handleUpdateAllTags}
                    columnWidth={columnWidth}
                    onCheckDeal={handleCheckDeal}
                    isPending={isPending}
                    onUpdateDeal={handleUpdateDeal}
                    isAdmin={isAdmin}
                />

                {!isAdmin && (
                    <AddTableRow
                        columnWidth={columnWidth}
                        onCreateDeal={handleCreateDeal}
                        selectedDeals={selectedDeals}
                        onRmoveDeal={handleRmoveDeal}
                        isSortingEnabled={isSortingEnabled}
                        onResetSort={handleResetSort}
                    />
                )}
            </div>
        </div>
    );
}
