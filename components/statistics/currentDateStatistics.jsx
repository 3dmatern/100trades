import { CurrentDayStatistics } from "./CurrentDayStatistics";
import { CurrentTimeStatistics } from "./currentTimeStatistics";

export const CurrentDateStatistics = ({
  dealsStatWLDays,
  dealsStatWLHours,
}) => {
  return (
    <div
      className="
        py-2 flex flex-col items-center justify-center gap-2.5 md:flex-row text-sm md:text-base
      "
    >
      <CurrentDayStatistics dealsStatWLDays={dealsStatWLDays} />
      <CurrentTimeStatistics dealsStatWLHours={dealsStatWLHours} />
    </div>
  );
};
