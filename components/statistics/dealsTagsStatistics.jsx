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
  const { winTags, lossTags } = tagsWLStat;
  const winIsMore = winTags.length > lossTags.length;
  const lossIsMore = lossTags.length > winTags.length;

  const getTableBody = () => {
    return (
      <>
        <TableRow>
          <TableCell colSpan={2} className="text-center text-teal-500">
            Win
          </TableCell>
        </TableRow>
        {winTags.map((winTag) => (
          <TableRow key={winTag.tag.id}>
            <TableCell>{winTag.tag.label}</TableCell>
            <TableCell className="text-center">{winTag.count}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={2} className="text-center text-destructive">
            Loss
          </TableCell>
        </TableRow>
        {lossTags.map((lossTag) => (
          <TableRow key={lossTag.tag.id}>
            <TableCell>{lossTag.tag.label}</TableCell>
            <TableCell className="text-center">{lossTag.count}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <Table className="max-w-[400px] min-w-80 w-full max-h-[598px] mx-auto border overflow-y-auto no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">Теги</TableHead>
          <TableHead className="max-w-[100px] text-center">
            Количество
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{getTableBody()}</TableBody>
    </Table>
  );
});
