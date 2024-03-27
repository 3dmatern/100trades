"use client";

import { useEffect, useState } from "react";
import { currentTime } from "@/utils/formatedDate";
import { createRowData } from "@/utils/createRowData";

import { CurrentDateCard } from "./ui/currentDateCard";

export const CurrentTimeStatistics = ({ dealsStatWLHours }) => {
  const [dealStat, setDealStat] = useState();
  const [dealRow, setDealRow] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const deal = dealsStatWLHours.find(
        (deal) => +deal.name.split("-")[0] === new Date().getHours()
      );

      if (deal) {
        setDealStat((prev) => deal);
        setDealRow((prev) => [
          createRowData("Время", currentTime()),
          createRowData("W:L", `${deal.win}:${deal.loss}`),
          createRowData("Сделок", deal.count),
        ]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dealsStatWLHours]);

  return dealRow.length > 0 ? (
    <CurrentDateCard>
      {dealRow?.map((row, index) => (
        <CurrentDateCard.Item key={index}>
          <CurrentDateCard.ItemName name={row.name} />
          <CurrentDateCard.ItemDescription
            className={
              index === 1 &&
              ((dealStat.win > dealStat.loss && "text-teal-500") ||
                (dealStat.loss > dealStat.win && "text-destructive"))
            }
            description={row.description}
          />
        </CurrentDateCard.Item>
      ))}
    </CurrentDateCard>
  ) : (
    <p className="text-xs text-slate-500">
      Вы не совершали сделок в это время дня.
    </p>
  );
};
