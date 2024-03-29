"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDealsStatWLPeriod } from "@/lib/deals";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";
import { getStatDays, getStatHours } from "@/utils/getStatisticsDeals";

export function useDealsStatisticsAdmin({ winID, lossID }) {
  const [allHoursWLStat, setAllHoursWLStat] = useState({
    dealsStat: [],
    totalCount: 0,
    totalWin: 0,
    totalLoss: 0,
  });
  const [allDaysWLStat, setAllDaysWLStat] = useState({
    dealsStat: [],
    totalCount: 0,
    totalWin: 0,
    totalLoss: 0,
  });

  useEffect(() => {
    if (winID && lossID) {
      const getData = async () => {
        const deals = await getDealsStatWLPeriod({ winID, lossID });

        if (deals && deals.error) {
          toast.error(users.error);
        } else {
          const { dealsStatHours, allCountHours, allWinHours, allLossHours } =
            getStatHours({ deals, winID, lossID, times: TIMES_PERIOD });
          const { dealsStatDays, allCountDays, allWinDays, allLossDays } =
            getStatDays({ deals, winID, lossID, days: DAYS_PERIOD });

          setAllHoursWLStat((prev) => ({
            ...prev,
            dealsStat: dealsStatHours,
            totalCount: allCountHours,
            totalWin: allWinHours,
            totalLoss: allLossHours,
          }));
          setAllDaysWLStat((prev) => ({
            ...prev,
            dealsStat: dealsStatDays,
            totalCount: allCountDays,
            totalWin: allWinDays,
            totalLoss: allLossDays,
          }));
        }
      };

      getData();
    }
  }, [lossID, winID]);

  return {
    allHoursWLStat,
    allDaysWLStat,
  };
}
