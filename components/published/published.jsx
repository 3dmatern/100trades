"use client";

import Link from "next/link";

import { useSheetPublished } from "@/hooks/use-sheet-published";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";
import { useSortedDeals } from "@/hooks/use-deals-sorted";

import SheetWrapper from "@/components/sheet/sheetWrapper";
import { Button } from "@/components/ui/button";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

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
    <>
      <div className="flex items-center justify-between pt-5 px-5">
        <h1 className="text-2xl font-bold">Журнал Cделок</h1>

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
      <SheetWrapper className="h-[calc(100vh-132px)]">
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
          onClickDealImg={onClickDealImg}
          isPublished={true}
          deal={sheetPublished?.deals?.[0]}
          dealsInfoStat={dealsInfoStat}
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
              allRRs={risksRewards}
              allTags={sheetPublished?.tagsUser}
              isPublished={true}
              isModal={true}
              deal={currentDealOptions?.deal}
            />
          }
        />
      </SheetWrapper>
    </>
  );
}
