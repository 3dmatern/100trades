"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDealsStatWLPeriod } from "@/lib/deals";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";
import { getStatDays, getStatHours } from "@/utils/getStatisticsDeals";

export function useDealsStatisticsAdmin({ winID, lossID }) {
  const [allDealsStatWLHours, setAllDealsStatWLHours] = useState([]);
  const [allTotalCountHours, setAllTotalCountHours] = useState(null);
  const [allTotalWinHours, setAllTotalWinHours] = useState(null);
  const [allTotalLossHours, setAllTotalossHours] = useState(null);

  const [allDealsStatWLDays, setAllDealsStatWLDays] = useState([]);
  const [allTotalCountDays, setAllTotalCountDays] = useState(null);
  const [allTotalWinDays, setAllTotalWinDays] = useState(null);
  const [allTotalLossDays, setAllTotalossDays] = useState(null);

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

          setAllDealsStatWLHours((prev) => dealsStatHours);
          setAllTotalCountHours((prev) => allCountHours);
          setAllTotalWinHours((prev) => allWinHours);
          setAllTotalossHours((prev) => allLossHours);

          setAllDealsStatWLDays((prev) => dealsStatDays);
          setAllTotalCountDays((prev) => allCountDays);
          setAllTotalWinDays((prev) => allWinDays);
          setAllTotalossDays((prev) => allLossDays);
        }
      };

      getData();
    }
  }, [lossID, winID]);

  return {
    allDealsStatWLHours,
    allTotalCountHours,
    allTotalWinHours,
    allTotalLossHours,
    allDealsStatWLDays,
    allTotalCountDays,
    allTotalWinDays,
    allTotalLossDays,
  };
}
