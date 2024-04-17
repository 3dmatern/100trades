"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";
import { useTakes } from "@/hooks/use-takes";
import { useDeals } from "@/hooks/use-deals";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";
import { useSortedDeals } from "@/hooks/use-deals-sorted";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

import UiContainer from "@/components/sheet/sheetWrapper";
import Sheets from "@/components/sheet/sheets";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { CurrentDateStatistics } from "@/components/statistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function SheetPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const tableRef = useRef(null);
  const user = useCurrentUser();
  const {
    sheets,
    currentSheetColumns,
    onSheetUpdate,
    onRemoveSheet,
    onUpdatePrivateSettings
  } = useSheets({ userId: user.id, sheetId: id});
  const { results } = useResults();
  const { longShorts } = useLongShort();
  const { risksRewards } = useRisksRewards();
  const { tags } = useTags({ userId: user.id });
  const { takes } = useTakes(user.id);
  const { onSort, onResetSort } = useSortedDeals(
    results,
    longShorts,
    risksRewards
  );
  const { hoursWLStat, daysWLStat, onCRUDDeal } = useDealsStatistics({
    userId: user.id,
    winID: RESULT_WIN_ID,
    lossID: RESULT_LOSS_ID,
  });
  const {
    deals,
    dealsInfo,
    selectedDeals,
    checkAll,
    isSortingEnabled,
    isPending,
    onCreateDeal,
    onUpdateDeal,
    onRemoveDeal,
    onCheckAll,
    onCheckDeal,
    onSortDeals,
    onResetSortDeals,
  } = useDeals({
    userId: user.id,
    sheetId: id,
    onSort,
    onResetSort,
    onCRUDDeal,
  });
  const { dealsInfoStat } = useDealsStatistics({ dealsInfo, results });
  const {
    currentDealOptions,
    isThereDeal,
    onClickDealImg,
    onRemoveImg,
    onCloseModal,
    onPrevDeal,
    onNextDeal,
  } = useDealModalCarousel({ deals, onUpdateDeal });
  const [sheetWidth, setSheetWidth] = useState(0);

  useEffect(() => {
    if (sheets && sheets.length === 0) {
      router.push("/sheets");
    }
  }, [router, sheets]);

  useEffect(()=>{
    const getWidth = () => {
      if (tableRef.current && currentSheetColumns) {
        const tableWidth = tableRef.current.clientWidth;
        const windowWidth = window.innerWidth;

        if (windowWidth > tableWidth) {
          setSheetWidth(tableWidth);
        } else {
          setSheetWidth(0);
        }
      }
    };

    getWidth();
    
    window.addEventListener("resize", getWidth);
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [currentSheetColumns]);

  return (
    <UiContainer
      className="
        flex flex-col p-4 pb-0 relative overflow-x-hidden
      "
    >
      <CurrentDateStatistics
        dealsStatWLHours={hoursWLStat?.dealsStat}
        dealsStatWLDays={daysWLStat?.dealsStat}
      />

      <Sheets
        userId={user.id}
        sheets={sheets}
        sheetId={id}
        currentSheetColumns={currentSheetColumns}
        sheetWidth={sheetWidth}
        onSheetUpdate={onSheetUpdate}
        onRemoveSheet={onRemoveSheet}
        onUpdatePrivateSettings={onUpdatePrivateSettings}
      />

      <Table
        tableRef={tableRef}
        userId={user.id}
        deals={deals}
        dealsInfoStat={dealsInfoStat}
        sheetId={id}
        selectedDeals={selectedDeals}
        checkAll={checkAll}
        isSortingEnabled={isSortingEnabled}
        isPending={isPending}
        onCreateDeal={onCreateDeal}
        onUpdateDeal={onUpdateDeal}
        onRemoveDeal={onRemoveDeal}
        onCheckAll={onCheckAll}
        onCheckDeal={onCheckDeal}
        onSort={onSortDeals}
        onResetSort={onResetSortDeals}
        results={results}
        longShorts={longShorts}
        risksRewarsData={risksRewards}
        tagsData={tags}
        takesData={takes}
        onClickDealImg={onClickDealImg}
        lossID={RESULT_LOSS_ID}
        currentSheetColumns={currentSheetColumns}
      />

      <DealScreenshotModal
        isOpen={currentDealOptions}
        isThereDeal={isThereDeal}
        deal={deals?.find((d) => d.id === currentDealOptions?.deal.id)}
        currentScreen={currentDealOptions?.inputName}
        onRemove={onRemoveImg}
        onClose={onCloseModal}
        onPrevDeal={onPrevDeal}
        onNextDeal={onNextDeal}
        table={
          <Table
            userId={user.id}
            deals={deals}
            sheetId={id}
            selectedDeals={selectedDeals}
            checkAll={checkAll}
            isSortingEnabled={isSortingEnabled}
            isPending={isPending}
            onCreateDeal={onCreateDeal}
            onUpdateDeal={onUpdateDeal}
            onRemoveDeal={onRemoveDeal}
            onCheckAll={onCheckAll}
            onCheckDeal={onCheckDeal}
            onSort={onSortDeals}
            onResetSort={onResetSortDeals}
            results={results}
            longShorts={longShorts}
            risksRewarsData={risksRewards}
            tagsData={tags}
            takesData={takes}
            onClickDealImg={onRemoveImg}
            isModal={true}
            deal={deals?.find((d) => d.id === currentDealOptions?.deal.id)}
            currentSheetColumns={currentSheetColumns}
          />
        }
      />
    </UiContainer>
  );
}
