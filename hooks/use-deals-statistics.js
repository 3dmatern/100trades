"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDealsStatWLPeriod } from "@/lib/deals";
import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";

export function useDealsStatistics({ isAdmin = false, userId, winID, lossID }) {
    const [dealsStatTikerInit, setDealsStatTikerInit] = useState([]);
    const [dealsStatTikerDefault, setDealsStatTikerDefault] = useState([]);
    const [totalCountTiker, setTotalCountTiker] = useState(null);
    const [winPercentTiker, setWinPercentTiker] = useState(null);
    const [lossPercentTiker, setLossPercentTiker] = useState(null);

    const [dealsStatWLHours, setDealsStatWLHours] = useState([]);
    const [totalCountHours, setTotalCountHours] = useState(null);
    const [totalWinHours, setTotalWinHours] = useState(null);
    const [totalLossHours, setLTotalossHours] = useState(null);

    const [dealsStatWLDays, setDealsStatWLDays] = useState([]);
    const [totalCountDays, setTotalCountDays] = useState(null);
    const [totalWinDays, setTotalWinDays] = useState(null);
    const [totalLossDays, setLTotalossDays] = useState(null);

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
                    setDealsStatTikerInit((prev) => deals);

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

                    setDealsStatTikerDefault((prev) => dealsStatistics);
                    setTotalCountTiker((prev) => allCount);
                    setWinPercentTiker((prev) =>
                        percentWinOfCount(allWin, allCount)
                    );
                    setLossPercentTiker((prev) =>
                        percentLossOfCount(allLoss, allCount)
                    );

                    const {
                        dealsStatHours,
                        allCountHours,
                        allWinHours,
                        allLossHours,
                    } = getStatHours({
                        deals,
                        winID,
                        lossID,
                    });

                    setDealsStatWLHours((prev) => dealsStatHours);
                    setTotalCountHours((prev) => allCountHours);
                    setTotalWinHours((prev) => allWinHours);
                    setLTotalossHours((prev) => allLossHours);

                    const {
                        dealsStatDays,
                        allCountDays,
                        allWinDays,
                        allLossDays,
                    } = getStatDays({ deals, winID, lossID });

                    setDealsStatWLDays((prev) => dealsStatDays);
                    setTotalCountDays((prev) => allCountDays);
                    setTotalWinDays((prev) => allWinDays);
                    setLTotalossDays((prev) => allLossDays);
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
                    const {
                        dealsStatHours,
                        allCountHours,
                        allWinHours,
                        allLossHours,
                    } = getStatHours({ deals, winID, lossID });

                    setDealsStatWLHours((prev) => dealsStatHours);
                    setTotalCountHours((prev) => allCountHours);
                    setTotalWinHours((prev) => allWinHours);
                    setLTotalossHours((prev) => allLossHours);

                    const {
                        dealsStatDays,
                        allCountDays,
                        allWinDays,
                        allLossDays,
                    } = getStatDays({ deals, winID, lossID });

                    setDealsStatWLDays((prev) => dealsStatDays);
                    setTotalCountDays((prev) => allCountDays);
                    setTotalWinDays((prev) => allWinDays);
                    setLTotalossDays((prev) => allLossDays);
                }
            };

            getData();
        }
    }, [isAdmin, lossID, winID]);

    return {
        dealsStatTikerDefault,
        totalCountTiker,
        winPercentTiker,
        lossPercentTiker,
        dealsStatWLHours,
        totalCountHours,
        totalWinHours,
        totalLossHours,
        dealsStatWLDays,
        totalCountDays,
        totalWinDays,
        totalLossDays,
    };
}

function getStatHours({ deals, winID, lossID }) {
    let statistics = {};
    let allCountHours = 0;
    let allWinHours = 0;
    let allLossHours = 0;

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

    const dealsStatHours = Object.keys(statistics)
        .sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        })
        .map((key) => {
            allCountHours += statistics[key].count;
            allWinHours += statistics[key].win;
            allLossHours += statistics[key].loss;

            return statistics[key];
        });

    return {
        dealsStatHours,
        allCountHours,
        allWinHours,
        allLossHours,
    };
}

function getStatDays({ deals, winID, lossID }) {
    let statistics = {};
    let allCountDays = 0;
    let allWinDays = 0;
    let allLossDays = 0;

    statistics = deals.reduce((acc, item) => {
        const entryDayIndex = new Date(item.entryDate).getDay();
        const itemResultId = item.resultId;

        for (const day of DAYS_PERIOD) {
            const dayName = day.name.toUpperCase();
            const dayIndex = day.index;

            if (acc[dayName] && entryDayIndex === dayIndex) {
                if (itemResultId === winID) {
                    acc[dayName].win++;
                    acc[dayName].count++;
                }

                if (itemResultId === lossID) {
                    acc[dayName].loss++;
                    acc[dayName].count++;
                }
            } else if (
                !acc[dayName] &&
                entryDayIndex === dayIndex &&
                (itemResultId === winID || itemResultId === lossID)
            ) {
                acc[dayName] = {
                    name: dayName,
                    dayIndex,
                    count: 1,
                    win: itemResultId === winID ? 1 : 0,
                    loss: itemResultId === lossID ? 1 : 0,
                };
            }
        }

        return acc;
    }, {});

    const dealsStatDays = Object.keys(statistics)
        .map((key) => {
            allCountDays += statistics[key].count;
            allWinDays += statistics[key].win;
            allLossDays += statistics[key].loss;

            return statistics[key];
        })
        .sort((a, b) => {
            if (a.dayIndex > b.dayIndex) return 1;
            if (a.dayIndex < b.dayIndex) return -1;
            return 0;
        });

    return {
        dealsStatDays,
        allCountDays,
        allWinDays,
        allLossDays,
    };
}
