"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { DAYS_PERIOD, TIMES_PERIOD } from "@/hooks/constants";

import {
  percentLossOfCount,
  percentWinOfCount,
  percentAverageRisk,
} from "@/utils/getPercent";
import { getStatDays, getStatHours } from "@/utils/getStatisticsDeals";
import { getTag } from "@/actions/tag";

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
  const [tikersStat, setTikersStat] = useState({
    initDealsStat: [],
    dealsStat: [],
    totalCount: 0,
    winPercent: 0,
    lossPercent: 0,
  });
  const [hoursWLStat, setHoursWLStat] = useState({
    dealsStat: [],
    totalCount: 0,
    totalWin: 0,
    totalLoss: 0,
  });
  const [daysWLStat, setDaysWLStat] = useState({
    dealsStat: [],
    totalCount: 0,
    totalWin: 0,
    totalLoss: 0,
  });
  const [tagsWLStat, setTagsWLStat] = useState({});

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

            setHoursWLStat((prev) => ({ ...prev, dealsStat: dealsStatHours }));
            setDaysWLStat((prev) => ({ ...prev, dealsStat: dealsStatDays }));
            setIsCRUDDeal((prev) => false);
          } else {
            setTikersStat((prev) => ({ ...prev, initDealsStat: deals }));

            let statistics = {};
            let allCount = 0;
            let allWin = 0;
            let allLoss = 0;
            let allWinTags = [];
            let allLossTags = [];
            let dealCountWithWLTags = 0;
            let mergeWLTags = {};

            statistics = deals.reduce((acc, item) => {
              const itemName = item.name;
              const itemResultId = item.resultId;
              const itemRisk = Number(item.risk);
              const itemRiskNaN = !isNaN(itemRisk);
              const itemEntryDay = new Date(item.entryDate).getDay();
              const itemTagsIds = item.entrieTag?.map((tag) => tag.tagId);

              const isWin = itemResultId === winID;
              const isLoss = itemResultId === lossID;

              (isWin || isLoss) && itemTagsIds.length && dealCountWithWLTags++;

              if (acc[itemName]) {
                if (isWin) {
                  acc[itemName].count++;
                  acc[itemName].win++;

                  if (itemRiskNaN) {
                    acc[itemName].averageRiskWinPercent += itemRisk;
                  }

                  if (itemTagsIds.length > 0) {
                    acc[itemName].winTags = [
                      ...acc[itemName].winTags,
                      ...itemTagsIds,
                    ];
                  }
                } else if (isLoss) {
                  acc[itemName].count++;
                  acc[itemName].loss++;

                  if (itemRiskNaN) {
                    acc[itemName].averageRiskLossPercent += itemRisk;
                  }

                  if (itemTagsIds.length > 0) {
                    acc[itemName].lossTags = [
                      ...acc[itemName].lossTags,
                      ...itemTagsIds,
                    ];
                  }
                }
              } else if (!acc[itemName] && (isWin || isLoss)) {
                acc[itemName] = {
                  name: itemName,
                  count: 1,
                  win: isWin ? 1 : 0,
                  loss: isLoss ? 1 : 0,
                  averageRiskWinPercent: isWin && itemRiskNaN ? itemRisk : 0,
                  averageRiskLossPercent: isLoss && itemRiskNaN ? itemRisk : 0,
                  winTags: isWin ? [...itemTagsIds] : [],
                  lossTags: isLoss ? [...itemTagsIds] : [],
                };
              }

              return acc;
            }, {});

            const dealsStatistics = Object.keys(statistics)
              .map((key) => {
                allCount += statistics[key].count;
                allWin += statistics[key].win;
                allLoss += statistics[key].loss;
                allWinTags = [...allWinTags, ...statistics[key].winTags];
                allLossTags = [...allLossTags, ...statistics[key].lossTags];

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
                  averageRiskWinPercent: percentAverageRisk(
                    statistics[key].averageRiskWinPercent,
                    statistics[key].win
                  ),
                  averageRiskLossPercent: percentAverageRisk(
                    statistics[key].averageRiskLossPercent,
                    statistics[key].loss
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

            setTikersStat((prev) => ({
              ...prev,
              dealsStat: dealsStatistics,
              totalCount: allCount,
              winPercent: percentWinOfCount(allWin, allCount),
              lossPercent: percentLossOfCount(allLoss, allCount),
            }));

            const { dealsStatHours, allCountHours, allWinHours, allLossHours } =
              getStatHours({
                deals,
                winID,
                lossID,
                times: TIMES_PERIOD,
              });
            const { dealsStatDays, allCountDays, allWinDays, allLossDays } =
              getStatDays({ deals, winID, lossID, days: DAYS_PERIOD });

            setHoursWLStat((prev) => ({
              ...prev,
              dealsStat: dealsStatHours,
              totalCount: allCountHours,
              totalWin: allWinHours,
              totalLoss: allLossHours,
            }));
            setDaysWLStat((prev) => ({
              ...prev,
              dealsStat: dealsStatDays,
              totalCount: allCountDays,
              totalWin: allWinDays,
              totalLoss: allLossDays,
            }));

            allWinTags = counterTags(allWinTags);
            allLossTags = counterTags(allLossTags);
            mergeWLTags = await cycleMergeWLTags(allWinTags, allLossTags);
           
            const { mergeResult, allWinCount, allLossCount } = mergeWLTags;

            setTagsWLStat((prev) => ({
              dealCount: dealCountWithWLTags,
              tagsStat: mergeResult,
              allWinCount,
              allLossCount,
            }));
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
    tikersStat,
    hoursWLStat,
    daysWLStat,
    tagsWLStat,
    dealsInfoStat,
    resultActiveId,
    onCRUDDeal: handleCRUDDeal,
  };
}

function counterTags(tags) {
  return tags.reduce((acc, tagId) => {
    const tagIndex = acc.findIndex((t) => t.tagId === tagId);

    if (tagIndex !== -1) {
      acc[tagIndex] = {
        ...acc[tagIndex],
        count: acc[tagIndex].count + 1,
      };
    } else {
      acc.push({
        tagId: tagId,
        count: 1,
      });
    }

    return acc;
  }, []);
}

async function cycleMergeWLTags(winTags, lossTags) {
  const mergeResult = [];
  let allWinCount = 0;
  let allLossCount = 0;

  for (const winTag of winTags) {
    const tagId = winTag.tagId;
    const lossTag = lossTags.find((t) => t.tagId === tagId);
    const tagData = await getTag(tagId);

    allWinCount += winTag.count;
    mergeResult.push({
      tag: tagData,
      winCount: winTag.count,
      lossCount: lossTag ? lossTag.count : 0,
    });
  }

  for (const lossTag of lossTags) {
    const tagId = lossTag.tagId;
    const winTag = winTags.find((t) => t.tagId === tagId);

    allLossCount += lossTag.count;

    if (!winTag) {
      const tagData = await getTag(tagId);

      mergeResult.push({
        tag: tagData,
        winCount: 0,
        lossCount: lossTag.count,
      });
    }
  }


  mergeResult.sort((a, b) => {
    const aCount = a.winCount + a.lossCount;
    const bCount = b.winCount + b.lossCount;
    if (aCount > bCount) {
      return -1;
    }
    if (aCount < bCount) {
      return 1;
    }
    return 0;
  });

  return { mergeResult, allWinCount, allLossCount };
}

function parseTimeInTrade(time) {
  const parseTime = time.split(" ");
  return parseTime;
}
