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

export const DealsTagsStatistics = memo(function DealsDaysStatistics({
  tagsWLStat,
}) {
  const { tagsStat, allWinCount, allLossCount } = tagsWLStat;

  const getTableBody = () => {
    return tagsStat?.map((tagStat, index) => {
      const { tag, winCount, lossCount } = tagStat;
      const winIsMore = winCount > lossCount;
      const lossIsMore = lossCount > winCount;

      return (
        <TableRow key={index}>
          <TableCell>{tag.label}</TableCell>
          <TableCell
            className={cn(
              "text-center",
              winIsMore && "text-teal-500",
              lossIsMore && "text-destructive"
            )}
          >
            {winCount}:{lossCount}
          </TableCell>
          <TableCell className="text-center">{winCount + lossCount}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table className="max-w-[400px] min-w-80 w-full max-h-[598px] mx-auto border overflow-y-auto no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">Тег</TableHead>
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
              allWinCount > allLossCount && "text-teal-500",
              allWinCount < allLossCount && "text-destructive"
            )}
          >
            {allWinCount}:{allLossCount}
          </TableCell>
          <TableCell className="text-center">
            {allWinCount + allLossCount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
});
