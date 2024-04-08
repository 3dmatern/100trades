"use client";

import { memo } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DealsDaysStatistics = memo(function DealsDaysStatistics({
  daysWLStat,
}) {
  const { dealsStat, totalCount, totalWin, totalLoss } = daysWLStat;

  const getTableBody = () => {
    return dealsStat?.map((deal, index) => {
      const winIsMore = deal.win > deal.loss;
      const lossIsMore = deal.loss > deal.win;

      return (
        <TableRow key={index}>
          <TableCell>{deal.name}</TableCell>
          <TableCell
            className={cn(
              "text-center",
              winIsMore && "text-teal-500",
              lossIsMore && "text-destructive"
            )}
          >
            {deal.win}:{deal.loss}
          </TableCell>
          <TableCell className="text-center">{deal.count}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table className="max-w-[400px] min-w-80 w-full max-h-[598px] mx-auto border overflow-y-auto no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">День</TableHead>
          <TableHead className="max-w-[100px] text-center">W:L</TableHead>
          <TableHead className="max-w-[100px] text-center">Сделок</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{getTableBody()}</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Всего</TableCell>
          <TableCell
            className={cn(
              "text-center",
              totalWin > totalLoss && "text-teal-500",
              totalWin < totalLoss && "text-destructive"
            )}
          >
            {totalWin}:{totalLoss}
          </TableCell>
          <TableCell className="text-center">{totalCount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
});
