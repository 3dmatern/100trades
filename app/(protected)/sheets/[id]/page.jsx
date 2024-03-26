"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";
import { useDeals } from "@/hooks/use-deals";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";
import { useSortedDeals } from "@/hooks/use-deals-sorted";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

import SheetWrapper from "@/components/sheet/sheetWrapper";
import Sheets from "@/components/sheet/sheets";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { CurrentDateStatistics } from "@/components/statistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function SheetPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const user = useCurrentUser();
  const { sheets, onSheetUpdate, onRemoveSheet } = useSheets(user.id);
  const { results } = useResults();
  const { longShorts } = useLongShort();
  const { risksRewards } = useRisksRewards();
  const { tags } = useTags(user.id);
  const { onSort, onResetSort } = useSortedDeals(
    results,
    longShorts,
    risksRewards
  );
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
    results,
    longShorts,
    risksRewards,
    onSort,
    onResetSort,
  });
  const {
    currentDealOptions,
    isThereDeal,
    onClickDealImg,
    onRemoveImg,
    onCloseModal,
    onPrevDeal,
    onNextDeal,
  } = useDealModalCarousel({ deals, onUpdateDeal });
  const { dealsStatWLDays, dealsStatWLHours } = useDealsStatistics({
    userId: user.id,
    winID: RESULT_WIN_ID,
    lossID: RESULT_LOSS_ID,
  });

  useEffect(() => {
    if (sheets && sheets.length === 0) {
      router.push("/sheets");
    }
  }, [router, sheets]);

  return (
    <SheetWrapper className="h-[calc(100%-132px)]">
      <CurrentDateStatistics
        dealsStatWLDays={dealsStatWLDays}
        dealsStatWLHours={dealsStatWLHours}
      />

      <Sheets
        userId={user.id}
        sheets={sheets}
        sheetId={id}
        onSheetUpdate={onSheetUpdate}
        onRemoveSheet={onRemoveSheet}
      />

      <Table
        userId={user.id}
        deals={deals}
        dealsInfo={dealsInfo}
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
        onClickDealImg={onClickDealImg}
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
            dealsInfo={dealsInfo}
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
            onClickDealImg={onRemoveImg}
            isModal={true}
            deal={deals?.find((d) => d.id === currentDealOptions?.deal.id)}
          />
        }
      />
    </SheetWrapper>
  );
}
