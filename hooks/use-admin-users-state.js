"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { getUsers } from "@/actions/user";
import { getDealsStatWLPeriod } from "@/lib/deals";
import { TIMES_PERIOD } from "./constants";

export function useAdminUsersState({ user, winID, lossID }) {
    const [dealsStatWLPeriod, setDealsStatWLPeriod] = useState(null);
    const [totalCountDealsStat, setTotalCountDealsStat] = useState(0);
    const [totalWin, setTotalWin] = useState(0);
    const [totalLoss, setLTotaloss] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectUserId, setSelectUserId] = useState("");

    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            return redirect("/");
        } else {
            const getData = async () => {
                const deals = await getDealsStatWLPeriod({ winID, lossID });
                const users = await getUsers(user);

                if (deals && deals.error) {
                    toast.error(users.error);
                } else {
                    let statistics = {};
                    let allCount = 0;
                    let allWin = 0;
                    let allLoss = 0;

                    statistics = deals.reduce((acc, item) => {
                        const entryHours = new Date(item.entryDate).getHours();
                        const entryMinutes = new Date(
                            item.entryDate
                        ).getMinutes();
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
                                (itemResultId === winID ||
                                    itemResultId === lossID)
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
                    setDealsStatWLPeriod((prev) => dealsStatistics);
                    setTotalCountDealsStat((prev) => allCount);
                    setTotalWin((prev) => allWin);
                    setLTotaloss((prev) => allLoss);
                }

                if (users && users.error) {
                    toast.error(users.error);
                } else {
                    const filteredUsers = users.filter((u) => u.id !== user.id);
                    setUsers((prev) => filteredUsers);
                }
            };

            getData();
        }
    }, [lossID, user, winID]);

    const handleSelectUser = (userId) => {
        setSelectUserId(userId);
    };

    return {
        dealsStatWLPeriod,
        totalCountDealsStat,
        totalWin,
        totalLoss,
        users,
        selectUserId,
        handleSelectUser,
    };
}
