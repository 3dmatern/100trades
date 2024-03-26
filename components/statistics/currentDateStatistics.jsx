import { CurrentDayStatistics } from "./currentDayStatistics";
import { CurrentTimeStatistics } from "./currentTimeStatistics";

export const CurrentDateStatistics = ({
  dealsStatWLCurrentHours,
  dealsStatWLCurrentDay,
}) => {
  return (
    <div
      className="
        py-2 flex flex-col items-center justify-center gap-2.5 md:flex-row text-sm md:text-base
      "
    >
      <CurrentDayStatistics dealsStatWLCurrentDay={dealsStatWLCurrentDay} />
      <CurrentTimeStatistics
        dealsStatWLCurrentHours={dealsStatWLCurrentHours}
      />
    </div>
  );
};
