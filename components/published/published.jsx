"use client";

import Link from "next/link";

import { useSheetPublished } from "@/hooks/use-sheet-published";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";
import { useSortedDeals } from "@/hooks/use-deals-sorted";

import { Button } from "@/components/ui/button";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";
import { UiContainer } from "../uikit/uiContainer";
import { Logo } from "../logo";

export function Published({ sheetPublishedId }) {
  const { results } = useResults();
  const { longShorts } = useLongShort();
  const { risksRewards } = useRisksRewards();
  const { onSort, onResetSort } = useSortedDeals(
    results,
    longShorts,
    risksRewards
  );
  const {
    sheetPublished,
    dealsInfo,
    isSortingEnabled,
    currentSheetColumns,
    onSortDeals,
    onResetSortDeals,
  } = useSheetPublished(sheetPublishedId, onSort, onResetSort);
  const { dealsInfoStat } = useDealsStatistics({ dealsInfo, results });
  const {
    currentDealOptions,
    isThereDeal,
    onClickDealImg,
    onCloseModal,
    onPrevDeal,
    onNextDeal,
  } = useDealModalCarousel({ deals: sheetPublished?.deals });

  return (
    <UiContainer className="px-4">
      <div className="flex items-center justify-between pt-5 px-5">        
        <Logo />

        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>

      <div className="flex items-center justify-center gap-5 flex-wrap mt-5">
        <span className="font-semibold">
          Название журнала:{" "}
          <span className="font-mono rounded-md bg-gray-200 py-1 px-2">
            {sheetPublished?.sheetName}
          </span>
        </span>
        <span className="font-semibold">
          Владелец:{" "}
          <span className="font-mono rounded-md bg-gray-200 py-1 px-2">
            {sheetPublished?.userNick}
          </span>
        </span>
      </div>

      <UiContainer className="pt-4" >
        <Table
          deals={sheetPublished?.deals}
          isSortingEnabled={isSortingEnabled}
          onSort={onSortDeals}
          onResetSort={onResetSortDeals}
          results={results}
          longShorts={longShorts}
          risksRewarsData={risksRewards}
          tagsData={sheetPublished?.tagsUser}
          takesData={sheetPublished?.takesUser}
          onClickDealImg={onClickDealImg}
          isPublished={true}
          deal={sheetPublished?.deals?.[0]}
          dealsInfoStat={dealsInfoStat}
          currentSheetColumns={currentSheetColumns}
        />

        <DealScreenshotModal
          isOpen={currentDealOptions}
          isThereDeal={isThereDeal}
          deal={currentDealOptions?.deal}
          currentScreen={currentDealOptions?.inputName}
          onClose={onCloseModal}
          onPrevDeal={onPrevDeal}
          onNextDeal={onNextDeal}
          isPublished={true}
          table={
            <Table
              deals={sheetPublished?.deals}
              dealsInfo={dealsInfo}
              isSortingEnabled={isSortingEnabled}
              onSort={onSortDeals}
              onResetSort={onResetSortDeals}
              results={results}
              longShorts={longShorts}
              risksRewarsData={risksRewards}
              tagsData={sheetPublished?.tagsUser}
              takesData={sheetPublished?.takesUser}
              isPublished={true}
              isModal={true}
              deal={currentDealOptions?.deal}
              currentSheetColumns={currentSheetColumns}
            />
          }
        />
      </UiContainer>
    </UiContainer>
  );
}
