"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";

import { percentLossOfCount, percentWinOfCount } from "@/utils/getPercent";
import { getStatDays, getStatHours } from "@/utils/getStatisticsDeals";

const initDealInfoStat = {
  percentWin: 0,
  percentLoss: 0,
  portfolioRisk: 0,
  portfolioProfit: 0,
  portfolioProgress: "",
  portfolioAverageTime: "",
};

export function useDealsStatistics({
  userId,
  winID,
  lossID,
  dealsInfo,
  results,
}) {
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

  const [dealsInfoStat, setDealInfoStat] = useState(initDealInfoStat);
  const [resultActiveId, setResultActiveId] = useState("");

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

  useEffect(() => {
    if (results?.length > 0 && dealsInfo?.length > 0) {
      setResultActiveId((prev) => results.find((r) => r.type === 4).id);

      let quantityWin = 0;
      let quantityLoss = 0;
      let quantityNoLoss = 0;
      let riskSum = 0;
      let profitSum = 0;
      let lastProgress = 0;
      let totalClosedDeal = 0;
      let quantityHours = 0;
      let quantityMinutes = 0;

      dealsInfo.forEach((d) => {
        if (d.timeInTrade) {
          const [hours, iterHours, minutes, iterMinutes] = parseTimeInTrade(
            d.timeInTrade
          );
          quantityHours += +hours;
          quantityMinutes += +minutes;
          totalClosedDeal++;
        }

        if (d.progress && lastProgress === 0) {
          lastProgress = d.progress;
        }

        results.forEach((r) => {
          if (r.id === d.resultId) {
            switch (r.type) {
              case 1:
                quantityWin++;
                break;
              case 2:
                quantityLoss++;
                break;
              case 3:
                quantityNoLoss++;
                break;
              case 4:
                riskSum = riskSum + (+d.pose / 100) * +d.risk;
                profitSum = profitSum + (+d.pose / 100) * +d.profit;
                break;
              default:
                break;
            }
          }
        });
      });

      const total = quantityWin + quantityLoss;
      if (quantityWin > 0) {
        const resultPercentWin = percentWinOfCount(quantityWin, total);

        setDealInfoStat((prev) => ({ ...prev, percentWin: resultPercentWin }));
      } else {
        setDealInfoStat((prev) => ({ ...prev, percentWin: 0 }));
      }

      if (quantityLoss > 0) {
        const resultPercentLoss = percentLossOfCount(quantityLoss, total);

        setDealInfoStat((prev) => ({
          ...prev,
          percentLoss: resultPercentLoss,
        }));
      } else {
        setDealInfoStat((prev) => ({ ...prev, percentLoss: 0 }));
      }

      if (lastProgress) {
        setDealInfoStat((prev) => ({
          ...prev,
          portfolioProgress: lastProgress,
        }));
      } else {
        setDealInfoStat((prev) => ({ ...prev, portfolioProgress: "" }));
      }

      if (totalClosedDeal > 0) {
        quantityHours += Math.floor(quantityMinutes / 60);

        quantityHours = Math.ceil(quantityHours / totalClosedDeal);
        quantityMinutes = Math.floor((quantityMinutes % 60) / totalClosedDeal);
      }

      setDealInfoStat((prev) => ({
        ...prev,
        portfolioRisk: riskSum,
        portfolioProfit: profitSum,
        portfolioAverageTime: `${quantityHours} ч. ${quantityMinutes} мин.`,
      }));
    } else {
      setDealInfoStat((prev) => initDealInfoStat);
    }
  }, [dealsInfo, results]);

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
    dealsInfoStat,
    resultActiveId,
    onCRUDDeal: handleCRUDDeal,
  };
}

function parseTimeInTrade(time) {
  const parseTime = time.split(" ");
  return parseTime;
}
