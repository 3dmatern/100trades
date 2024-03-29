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
  dealsInfo,
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
  onClickDealImg,
  isAdmin = false,
  isModal = false,
  deal,
  isPublished = false,
  lossID,
}) {
  const [allTags, setAllTags] = useState([]);
  const [allRRs, setAllRRs] = useState([]);
  const [columnWidth, setColumnWidth] = useState(COLUMN_WIDTH);

  const changeAllRRs = (rr) => {
    setAllRRs((prev) => [...prev, rr]);
  };

  const handleUpdateAllTags = (tags) => {
    setAllTags([...tags]);
  };

  const handleResize = (column, newWidth) => {
    setColumnWidth((prevWidths) => ({
      ...prevWidths,
      [column]: newWidth,
    }));
  };

  const getClassNameContainer = () => {
    if (isModal && !isPublished && !isAdmin) {
      return "h-[80px]";
    }

    if (isPublished) {
      return "mx-auto";
    }

    return "";
  };

  useEffect(() => {
    if (risksRewarsData) {
      if (risksRewarsData.error) {
        toast.error(risksRewarsData.error);
        return;
      }
      setAllRRs(risksRewarsData);
    }
  }, [risksRewarsData]);

  useEffect(() => {
    if (tagsData) {
      if (tagsData.error) {
        toast.error(tagsData.error);
        return;
      }
      setAllTags(tagsData);
    }
  }, [tagsData]);

  return (
    <TableLayout>
      <TableContainer className={getClassNameContainer()}>
        {!isModal && deals && (
          <TableInfo
            columnWidth={columnWidth}
            dealsInfo={dealsInfo}
            dealsInfoStat={dealsInfoStat}
            isPublished={isPublished}
          />
        )}

        {deals && (
          <TableHead
            checkAll={checkAll}
            columnWidth={columnWidth}
            onResize={handleResize}
            onCheckAll={onCheckAll}
            onSort={onSort}
            isAdmin={isAdmin}
            isModal={isModal}
            deal={deal}
            isPublished={isPublished}
            className={isModal ? "top-0" : null}
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
