"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { COLUMN_WIDTH } from "@/components/constants";

import { TableLayout } from "@/components/ui/table-layout";
import { TableContainer } from "@/components/ui/table-container";
import TableBody from "@/components/deals/tableBody";
import TableHead from "@/components/deals/tableHead";
import ActionTableRow from "@/components/deals/actionTableRow";
import TableInfo from "@/components/deals/tableInfo";

export default function Table({
  userId,
  deals,
  dealsInfoStat,
  sheetId,
  selectedDeals,
  checkAll,
  isSortingEnabled,
  isPending,
  onCreateDeal,
  onUpdateDeal,
  onRemoveDeal,
  onCheckAll,
  onCheckDeal,
  onSort,
  onResetSort,
  results,
  longShorts,
  risksRewarsData,
  tagsData,
  takesData,
  onClickDealImg,
  isAdmin = false,
  isModal = false,
  deal,
  isPublished = false,
  lossID,
  currentSheetColumns,
}) {
  const [allTags, setAllTags] = useState([]);
  const [allTakes, setAllTakes] = useState([]);
  const [allRRs, setAllRRs] = useState([]);
  const [columnWidth, setColumnWidth] = useState(COLUMN_WIDTH);

  const changeAllRRs = (rr) => {
    setAllRRs((prev) => [...prev, rr]);
  };

  const handleUpdateAllTags = (tags) => {
    setAllTags([...tags]);
  };

  const handleUpdateAllTakes = (takes) => {
    setAllTakes([...takes]);
  };

  const handleResize = (column, newWidth) => {
    setColumnWidth((prevWidths) => ({
      ...prevWidths,
      [column]: newWidth,
    }));
  };

  useEffect(() => {
    if (risksRewarsData) {
      if (risksRewarsData.error) {
        toast.error(risksRewarsData.error);
        return;
      }
      setAllRRs((prev) => risksRewarsData);
    }
  }, [risksRewarsData]);

  useEffect(() => {
    if (tagsData) {
      if (tagsData.error) {
        toast.error(tagsData.error);
        return;
      }
      setAllTags((prev) => tagsData);
    }
  }, [tagsData]);

  useEffect(() => {
    if (takesData) {
      if (takesData.error) {
        toast.error(takesData.error);
        return;
      }
      setAllTakes((prev) => takesData);
    }
  }, [takesData]);

  return (
    <TableLayout>
      <TableContainer className="mx-auto">
        {!isModal && deals && (
          <TableInfo
            columnWidth={columnWidth}
            dealsInfoStat={dealsInfoStat}
            isPublished={isPublished}
            currentSheetColumns={currentSheetColumns}
          />
        )}

        {deals && (
          <TableHead
            className={isModal ? "top-0" : null}
            checkAll={checkAll}
            columnWidth={columnWidth}
            onResize={handleResize}
            onCheckAll={onCheckAll}
            onSort={onSort}
            isAdmin={isAdmin}
            isModal={isModal}
            deal={deal}
            isPublished={isPublished}
            currentSheetColumns={currentSheetColumns}
          />
        )}

        <TableBody
          userId={userId}
          sheetId={sheetId}
          deals={isModal && deal ? [{ ...deal }] : deals}
          selectedDeals={selectedDeals}
          results={results}
          longShorts={longShorts}
          allRRs={allRRs}
          onChangeAllRRs={changeAllRRs}
          allTags={allTags}
          onUpdateAllTags={handleUpdateAllTags}
          allTakes={allTakes}
          onUpdateAllTakes={handleUpdateAllTakes}
          columnWidth={columnWidth}
          onCheckDeal={onCheckDeal}
          isPending={isPending}
          onCreateDeal={onCreateDeal}
          onUpdateDeal={onUpdateDeal}
          onClickDealImg={onClickDealImg}
          isAdmin={isAdmin}
          isModal={isModal}
          isPublished={isPublished}
          lossID={lossID}
          currentSheetColumns={currentSheetColumns}
        />

        {!isAdmin && !isModal && deals && (
          <ActionTableRow
            selectedDeals={selectedDeals}
            isSortingEnabled={isSortingEnabled}
            onRemoveDeal={onRemoveDeal}
            onResetSort={onResetSort}
          />
        )}
      </TableContainer>
    </TableLayout>
  );
}
