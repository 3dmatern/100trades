"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";
import { getStatDays, getStatHours } from "@/utils/getStatisticsDeals";

export function useDealsStatistics({ userId, winID, lossID }) {
  const [isCRUDDeal, setIsCRUDDeal] = useState(false);

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
          if (isCRUDDeal) {
            const { dealsStatHours } = getStatHours({
              deals,
              winID,
              lossID,
              times: TIMES_PERIOD,
            });
            const { dealsStatDays } = getStatDays({
              deals,
              winID,
              lossID,
              days: DAYS_PERIOD,
            });

            setDealsStatWLHours((prev) => dealsStatHours);
            setDealsStatWLDays((prev) => dealsStatDays);
            setIsCRUDDeal((prev) => false);
          } else {
            setDealsStatTikerInit((prev) => deals);

            let statistics = {};
            let allCount = 0;
            let allWin = 0;
            let allLoss = 0;

            statistics = deals.reduce((acc, item) => {
              const itemName = item.name;
              const itemResultId = item.resultId;
              const itemEntryDay = new Date(item.entryDate).getDay();

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
            setWinPercentTiker((prev) => percentWinOfCount(allWin, allCount));
            setLossPercentTiker((prev) =>
              percentLossOfCount(allLoss, allCount)
            );

            const { dealsStatHours, allCountHours, allWinHours, allLossHours } =
              getStatHours({
                deals,
                winID,
                lossID,
                times: TIMES_PERIOD,
              });
            const { dealsStatDays, allCountDays, allWinDays, allLossDays } =
              getStatDays({ deals, winID, lossID, days: DAYS_PERIOD });

            setDealsStatWLHours((prev) => dealsStatHours);
            setTotalCountHours((prev) => allCountHours);
            setTotalWinHours((prev) => allWinHours);
            setLTotalossHours((prev) => allLossHours);

            setDealsStatWLDays((prev) => dealsStatDays);
            setTotalCountDays((prev) => allCountDays);
            setTotalWinDays((prev) => allWinDays);
            setLTotalossDays((prev) => allLossDays);
          }
        }
      };

      getData();
    }
  }, [userId, winID, lossID, isCRUDDeal]);

  const handleCRUDDeal = () => {
    setIsCRUDDeal((prev) => !prev);
  };

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
    onCRUDDeal: handleCRUDDeal,
  };
}
