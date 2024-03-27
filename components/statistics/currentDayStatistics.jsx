import { createRowData } from "@/utils/createRowData";

import { DAYS } from "../constants";

import { CurrentDateCard } from "./ui/currentDateCard";

export const CurrentDayStatistics = ({ dealsStatWLDays }) => {
  const dealStat = dealsStatWLDays?.find(
    (deal) => deal.dayIndex === new Date().getDay()
  );

  if (dealStat) {
    const dealRow = [
      createRowData("День", DAYS[dealStat.dayIndex]),
      createRowData("W:L", `${dealStat.win}:${dealStat.loss}`),
      createRowData("Сделок", dealStat.count),
    ];
    return (
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
    );
  }

  return (
    <p className="text-xs text-slate-500">
      Вы не совершали сделок в этот день недели.
    </p>
  );
};
