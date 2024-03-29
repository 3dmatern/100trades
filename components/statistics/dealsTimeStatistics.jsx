"use client";

import { memo, useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { itemsCrop } from "@/utils/paginate";

import {
  Table,
  TableCaption,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGE_SIZE_STAT_HOURS } from "@/components/constants";
import { UiPagination } from "@/components/uikit/uiPagination";

export const DealsTimeStatistics = memo(function DealsTimeStatistics({
  hoursWLStat,
}) {
  const { dealsStat, totalCount, totalWin, totalLoss } = hoursWLStat;
  const [dealsStatCrop, setDealsStatCrop] = useState([]);
  const [{ currentPage, pageCount }, setPaginateData] = useState({
    currentPage: 1,
    pageCount: 0,
  });

  const changePaginateData = useCallback(
    (items) => {
      const pageCount = Math.ceil(items.length / PAGE_SIZE_STAT_HOURS);
      const dealsCrop = itemsCrop(items, currentPage, PAGE_SIZE_STAT_HOURS);

      setPaginateData((prev) => ({ ...prev, pageCount }));

      return dealsCrop;
    },
    [currentPage]
  );

  useEffect(() => {
    if (dealsStat) {
      const dealsStatisticsCrop = changePaginateData(dealsStat);

      setDealsStatCrop((prev) => dealsStatisticsCrop);
    }
  }, [changePaginateData, dealsStat]);

  function handleChangePage(selectPage) {
    if (selectPage === currentPage) return;

    setPaginateData((prev) => ({
      ...prev,
      currentPage: selectPage,
    }));

    const dealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_HOURS);

    if (dealsCrop) {
      setDealsStatCrop((prev) => dealsCrop);
    }
  }

  function handleClickPrevPage() {
    if (currentPage === 1 || pageCount === 0) {
      return;
    }

    const selectPage = currentPage - 1;

    setPaginateData((prev) => ({
      ...prev,
      currentPage: selectPage,
    }));

    const newDealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_HOURS);

    if (newDealsCrop) {
      setDealsStatCrop((prev) => newDealsCrop);
    }
  }

  function handleClickNextPage() {
    if (currentPage === pageCount || pageCount === 0) {
      return;
    }

    const selectPage = currentPage + 1;

    setPaginateData((prev) => ({
      ...prev,
      currentPage: selectPage,
    }));

    const newDealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_HOURS);

    if (newDealsCrop) {
      setDealsStatCrop((prev) => newDealsCrop);
    }
  }

  const getTableBody = () => {
    return dealsStatCrop.map((deal, index) => {
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
          <TableHead className="max-w-[100px]">Время</TableHead>
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
      <TableCaption>
        {pageCount > 1 && (
          <UiPagination
            currentPage={currentPage}
            pageCount={pageCount}
            onChangePage={handleChangePage}
            onClickPrevPage={handleClickPrevPage}
            onClickNextPage={handleClickNextPage}
          />
        )}
      </TableCaption>
    </Table>
  );
});
