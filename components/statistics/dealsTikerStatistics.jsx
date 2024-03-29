"use client";

import { memo, useCallback, useEffect, useState } from "react";

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
import { PAGE_SIZE_STAT_TIKER } from "@/components/constants";
import { itemsCrop } from "@/utils/paginate";
import { UiPagination } from "@/components/uikit/uiPagination";
import { cn } from "@/lib/utils";

export const DealsTikerStatistics = memo(function DealsTikerStatistics({
  tikersStat,
}) {
  const {
    dealsStat,
    totalCount,
    winPercent,
    lossPercent,
    allAverageRiskWin,
    allAverageRiskLoss,
  } = tikersStat;
  const [dealsStatCrop, setDealsStatCrop] = useState([]);

  const [{ currentPage, pageCount }, setPaginateData] = useState({
    currentPage: 1,
    pageCount: 0,
  });

  const changePaginateData = useCallback(
    (items) => {
      const pageCount = Math.ceil(items.length / PAGE_SIZE_STAT_TIKER);
      const dealsCrop = itemsCrop(items, currentPage, PAGE_SIZE_STAT_TIKER);

      setPaginateData((prev) => ({ ...prev, pageCount }));

      return dealsCrop;
    },
    [currentPage]
  );

  useEffect(() => {
    if (dealsStat.length) {
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

    const dealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_TIKER);

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

    const newDealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_TIKER);

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

    const newDealsCrop = itemsCrop(dealsStat, selectPage, PAGE_SIZE_STAT_TIKER);

    if (newDealsCrop) {
      setDealsStatCrop((prev) => newDealsCrop);
    }
  }

  const getTableBody = () => {
    return dealsStatCrop?.map((dealStat, index) => {
      const winIsMore = dealStat.win > dealStat.loss;
      const lossIsMore = dealStat.loss > dealStat.win;
      const riskWinIsMore =
        dealStat.averageRiskWinPercent > dealStat.averageRiskLossPercent;
      const riskLossIsMore =
        dealStat.averageRiskLossPercent > dealStat.averageRiskWinPercent;

      return (
        <TableRow key={index}>
          <TableCell className="font-medium">{dealStat.name}</TableCell>
          <TableCell
            className={cn(
              "text-center",
              winIsMore && "text-teal-500",
              lossIsMore && "text-destructive"
            )}
          >
            {dealStat.win}:{dealStat.loss}
          </TableCell>
          <TableCell
            className={cn(
              "text-center",
              riskWinIsMore && "text-teal-500",
              riskLossIsMore && "text-destructive"
            )}
          >
            {dealStat.averageRiskWinPercent}:{dealStat.averageRiskLossPercent}
          </TableCell>
          <TableCell className="text-center">{dealStat.count}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table className="max-w-[600px] min-w-80 w-full max-h-[598px] overflow-y-auto no-scrollbar">
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">Тикер</TableHead>
          <TableHead className="max-w-[100px] text-center">W:L(%)</TableHead>
          <TableHead className="max-w-[100px] text-center">
            STOP:Loss(%)
          </TableHead>
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
              winPercent > lossPercent && "text-teal-500",
              winPercent < lossPercent && "text-destructive"
            )}
          >
            {winPercent}:{lossPercent}
          </TableCell>
          <TableCell
            className={cn(
              "text-center",
              allAverageRiskWin > allAverageRiskLoss && "text-teal-500",
              allAverageRiskWin < allAverageRiskLoss && "text-destructive"
            )}
          >
            {allAverageRiskWin}:{allAverageRiskLoss}
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
