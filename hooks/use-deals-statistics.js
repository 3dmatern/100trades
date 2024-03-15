"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDealsStatWLPeriod } from "@/lib/deals";
import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";

import { TIMES_PERIOD } from "@/hooks/constants";

export function useDealsStatistics({ isAdmin = false, userId, winID, lossID }) {
    const [dealsStatInit, setDealsStatInit] = useState([]);
    const [dealsStatDefault, setDealsStatDefault] = useState([]);
    const [totalCountTiker, setTotalCountTiker] = useState(null);
    const [winPercent, setWinPercent] = useState(null);
    const [lossPercent, setLossPercent] = useState(null);

    const [dealsStatWLPeriod, setDealsStatWLPeriod] = useState([]);
    const [totalCountPeriod, setTotalCountPeriod] = useState(null);
    const [totalWin, setTotalWin] = useState(null);
    const [totalLoss, setLTotaloss] = useState(null);

    useEffect(() => {
        if (userId && winID && lossID) {
            const getData = async () => {
                const deals = await getSheetsWithEntrieWL({
                    userId,
                    winID,
                    lossID,
                });

                if (deals?.error) {
                    toast.error(deals.error);
                    return;
                } else if (deals?.redirect) {
                    return router.push(deals.redirect);
                }

                if (deals.length) {
                    setDealsStatInit((prev) => deals);

                    let statistics = {};
                    let allCount = 0;
                    let allWin = 0;
                    let allLoss = 0;

                    statistics = deals.reduce((acc, item) => {
                        const itemName = item.name;
                        const itemResultId = item.resultId;

                        if (acc[itemName]) {
                            if (itemResultId === winID) {
                                acc[itemName].count++;
                                acc[itemName].win++;
                            } else if (itemResultId === lossID) {
                                acc[itemName].count++;
                                acc[itemName].loss++;
                            }
                        } else if (
                            !acc[itemName] &&
                            (itemResultId === winID || itemResultId === lossID)
                        ) {
                            acc[itemName] = {
                                name: itemName,
                                count: 1,
                                win: itemResultId === winID ? 1 : 0,
                                loss: itemResultId === lossID ? 1 : 0,
                            };
                        }

                        return acc;
                    }, {});

                    const dealsStatistics = Object.keys(statistics)
                        .map((key) => {
                            allCount += statistics[key].count;
                            allWin += statistics[key].win;
                            allLoss += statistics[key].loss;

                            return {
                                ...statistics[key],
                                win: percentWinOfCount(
                                    statistics[key].win,
                                    statistics[key].count
                                ),
                                loss: percentLossOfCount(
                                    statistics[key].loss,
                                    statistics[key].count
                                ),
                            };
                        })
                        .sort((a, b) => {
                            if (a.count > b.count) {
                                return -1;
                            }

                            if (a.count < b.count) {
                                return 1;
                            }

                            return 0;
                        });

                    setDealsStatDefault((prev) => dealsStatistics);
                    setTotalCountTiker((prev) => allCount);
                    setWinPercent((prev) =>
                        percentWinOfCount(allWin, allCount)
                    );
                    setLossPercent((prev) =>
                        percentLossOfCount(allLoss, allCount)
                    );

                    const dealsStatMoreWOrL = getStatMoreWOrL({
                        deals,
                        winID,
                        lossID,
                    });

                    setDealsStatWLPeriod(
                        (prev) => dealsStatMoreWOrL.dealsStatistics
                    );
                    setTotalCountPeriod((prev) => dealsStatMoreWOrL.allCount);
                    setTotalWin((prev) => dealsStatMoreWOrL.allWin);
                    setLTotaloss((prev) => dealsStatMoreWOrL.allLoss);
                }
            };

            getData();
        }
    }, [userId, winID, lossID]);

    useEffect(() => {
        if (isAdmin && winID && lossID) {
            const getData = async () => {
                const deals = await getDealsStatWLPeriod({ winID, lossID });

                if (deals && deals.error) {
                    toast.error(users.error);
                } else {
                    const { dealsStatistics, allCount, allWin, allLoss } =
                        getStatMoreWOrL({ deals, winID, lossID });

                    setDealsStatWLPeriod((prev) => dealsStatistics);
                    setTotalCountPeriod((prev) => allCount);
                    setTotalWin((prev) => allWin);
                    setLTotaloss((prev) => allLoss);
                }
            };

            getData();
        }
    }, [isAdmin, lossID, winID]);

    return {
        dealsStatDefault,
        totalCountTiker,
        winPercent,
        lossPercent,
        dealsStatWLPeriod,
        totalCountPeriod,
        totalWin,
        totalLoss,
    };
}

function getStatMoreWOrL({ deals, winID, lossID }) {
    let statistics = {};
    let allCount = 0;
    let allWin = 0;
    let allLoss = 0;

    statistics = deals.reduce((acc, item) => {
        const entryHours = new Date(item.entryDate).getHours();
        const entryMinutes = new Date(item.entryDate).getMinutes();
        const itemResultId = item.resultId;

        for (const time of TIMES_PERIOD) {
            const timeEntry = time.entry;
            const timeExit = time.exit;
            const statisticName = `${timeEntry}-${timeExit}`;

            if (
                acc[statisticName] &&
                entryHours >= timeEntry &&
                entryHours < timeExit
            ) {
                if (itemResultId === winID) {
                    acc[statisticName].win++;
                    acc[statisticName].count++;
                }

                if (itemResultId === lossID) {
                    acc[statisticName].loss++;
                    acc[statisticName].count++;
                }
            } else if (
                !acc[statisticName] &&
                entryHours >= timeEntry &&
                entryHours < timeExit &&
                (itemResultId === winID || itemResultId === lossID)
            ) {
                acc[statisticName] = {
                    name: statisticName,
                    count: 1,
                    win: itemResultId === winID ? 1 : 0,
                    loss: itemResultId === lossID ? 1 : 0,
                };
            }
        }

        return acc;
    }, {});

    const dealsStatistics = Object.keys(statistics)
        .sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        })
        .map((key) => {
            allCount += statistics[key].count;
            allWin += statistics[key].win;
            allLoss += statistics[key].loss;

            return statistics[key];
        });

    return {
        dealsStatistics,
        allCount,
        allWin,
        allLoss,
    };
}
