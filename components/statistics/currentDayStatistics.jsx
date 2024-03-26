import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DAYS } from "../constants";

export function CurrentDayStatistics({ dealsStatWLDays }) {
  const getTableBody = () => {
    const dealStat = dealsStatWLDays.find(
      (deal) => deal.dayIndex === new Date().getDay()
    );

    if (dealStat) {
      const winIsMore = dealStat.win > dealStat.loss;
      const lossIsMore = dealStat.loss > dealStat.win;

      return (
        <Table className="max-w-[400px] min-w-80 w-max mx-auto border overflow-y-auto no-scrollbar">
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[100px]">День</TableHead>
              <TableHead className="max-w-[100px] text-center">W:L</TableHead>
              <TableHead className="max-w-[100px] text-center">
                Сделок
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{DAYS[dealStat.dayIndex]}</TableCell>
              <TableCell
                className={cn(
                  "text-center",
                  winIsMore && "text-teal-500",
                  lossIsMore && "text-destructive"
                )}
              >
                {dealStat.win}:{dealStat.loss}
              </TableCell>
              <TableCell className="text-center">{dealStat.count}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    }

    return "Вы не совершали сделок в этот день недели.";
  };

  return (
    dealsStatWLDays.length > 0 && (
      <div className="flex flex-col items-center gap-2.5 my-2.5">
        {getTableBody()}
      </div>
    )
  );
}
