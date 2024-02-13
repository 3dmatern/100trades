import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    createEntrie,
    getEntries,
    removeEntrie,
    updateEntrie,
} from "@/actions/entrie";
import {
    progress,
    resetEveryonesProgress,
    updateEveryonesProgress,
} from "@/utils/operationsWithProgress";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";
import {
    sortByAsc,
    sortByAscDate,
    sortByAscRR,
    sortByAscSelect,
    sortByAscString,
    sortByDesc,
    sortByDescDate,
    sortByDescRR,
    sortByDescSelect,
    sortByDescString,
} from "@/utils/sortBy";

export function useDeals(userId, sheetId, results, longShorts, risksRewards) {
    const [deals, setDeals] = useState([]);
    const [isPending, setIsPending] = useState(undefined);
    const [selectedDeals, setSelectedDeals] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

    useEffect(() => {
        if (sheetId) {
            const getData = async () => {
                const dealsData = await getEntries(sheetId);
                if (dealsData && dealsData.error) {
                    toast.error(dealsData.error);
                } else {
                    setDeals((prev) => dealsData);
                }
            };
            getData();
        } else {
            setDeals((prev) => []);
        }
    }, [sheetId]);

    const handleCreateDeal = async (values) => {
        let newDealId = "";

        if (values.deposit) {
            values = await modifiedValues({
                deals,
                values,
                userId,
                sheetId,
                setDeals,
            });
        }
        delete values?.id;

        const payload = {
            ...values,
            sheetId,
            entryDate:
                values?.entryDate || dealLimitionDateWithTime(Date.now()),
        };

        await createEntrie(userId, payload).then((data) => {
            if (data.error) {
                toast.error(data.error);
            }
            if (data.success) {
                const { success, newEntrie } = data;
                newDealId = newEntrie.id;
                setDeals((prev) => {
                    const newDeals = prev.slice();
                    newDeals.push(newEntrie);
                    return newDeals;
                });
                toast.success(success);
            }
        });

        return newDealId;
    };

    const handleUpdateDeal = async (values) => {
        setIsPending((prev) => values);

        try {
            const fixValues = await modifiedValues({
                deals,
                values,
                userId,
                sheetId,
                setDeals,
            });
            const data = await updateEntrie(userId, {
                ...fixValues,
                sheetId,
            });

            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                toast.success(data.success);

                const { payload } = data;

                setDeals((prev) => {
                    const updatedDeals = prev.map((deal) => ({ ...deal }));

                    const findIndexDealOfDeals = updatedDeals.findIndex(
                        (d) => d.id === payload.id
                    );

                    if (findIndexDealOfDeals !== -1) {
                        updatedDeals[findIndexDealOfDeals] = {
                            ...updatedDeals[findIndexDealOfDeals],
                            ...payload,
                        };
                    }

                    return updatedDeals;
                });
            }
        } catch (error) {
            toast.error("Ошибка обновления сделки!");
        }

        setIsPending(undefined);
    };

    const handleRemoveDeal = async () => {
        let removedDeal = [];
        let copySelectedDeals = selectedDeals;
        setSelectedDeals([]);

        setDeals((prev) =>
            prev.slice().filter((deal) => !copySelectedDeals.includes(deal.id))
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
                ...prev.slice().filter((c) => removedDeal.includes(c.id)),
            ]);
            setSelectedDeals(removedDeal);
        }

        toast.success(
            `Удалено записей ${successLength} из ${allRemoved.length}`
        );

        setCheckAll(false);
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

        const sortByOrderSelect = ({ iter, order }) => {
            if (iter === "resultId") {
                setDeals((prev) =>
                    order === "asc"
                        ? [...sortByAscSelect(prev, iter, results)]
                        : [...sortByDescSelect(prev, iter, results)]
                );
            } else {
                setDeals((prev) =>
                    order === "asc"
                        ? [...sortByAscSelect(prev, iter, longShorts)]
                        : [...sortByDescSelect(prev, iter, longShorts)]
                );
            }
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
            case "lsId":
                sortByOrderSelect(data);
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
            prev.slice().sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
        );
    };

    return {
        deals,
        checkAll,
        selectedDeals,
        isSortingEnabled,
        isPending,
        onCreateDeal: handleCreateDeal,
        onUpdateDeal: handleUpdateDeal,
        onRemoveDeal: handleRemoveDeal,
        onCheckAll: handleCheckAll,
        onCheckDeal: handleCheckDeal,
        onSort: handleSort,
        onResetSort: handleResetSort,
    };
}

async function modifiedValues({ deals, values, userId, sheetId, setDeals }) {
    const dealIndex = deals.findIndex((d) => d.id === values.id);
    const firstDeal = deals.reduce((minDeal, currentDeal) => {
        if (!minDeal || new Date(currentDeal.date) < new Date(minDeal.date)) {
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
    } else if (dealIndex !== -1 && !Object.keys(values).includes("deposit")) {
        const findDealProgress = deals[dealIndex].progress;
        values.progress = findDealProgress ? findDealProgress : "";
    } else if (values.deposit === "") {
        values.progress = "";
    }

    return values;
}
