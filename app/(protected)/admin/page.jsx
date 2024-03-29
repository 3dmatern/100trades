"use client";

import { BeatLoader } from "react-spinners";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";
import { useDeals } from "@/hooks/use-deals";
import { useSortedDeals } from "@/hooks/use-deals-sorted";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";
import { useAdminUsersState } from "@/hooks/use-admin-users-state";
import { useDealsStatistics } from "@/hooks/use-deals-statistics";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AdminSelect } from "@/components/admin";
import { DealsTimeStatistics } from "@/components/statistics/dealsTimeStatistics";
import SheetWrapper from "@/components/sheet/sheetWrapper";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { DealsDaysStatistics } from "@/components/statistics/dealsDaysStatistics";
import { CurrentDateStatistics } from "@/components/statistics";
import { useDealsStatisticsAdmin } from "@/hooks/use-deals-statistics-admin";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function AdminPage() {
  const user = useCurrentUser();
  const { users, selectUserId, onSelectUser } = useAdminUsersState({
    user,
  });
  const { sheets, selectSheetId, onSelectSheet } = useSheets(selectUserId);
  const { results } = useResults();
  const { longShorts } = useLongShort();
  const { risksRewards } = useRisksRewards();
  const { tags } = useTags(selectUserId);
  const { onSort, onResetSort } = useSortedDeals(
    results,
    longShorts,
    risksRewards
  );
  const { deals, dealsInfo, isSortingEnabled, onSortDeals, onResetSortDeals } =
    useDeals({
      isAdmin: true,
      userId: user.id,
      sheetId: selectSheetId,
      results,
      longShorts,
      risksRewards,
      onSort,
      onResetSort,
    });

  const { dealsStatWLHours, dealsStatWLDays } = useDealsStatistics({
    userId: selectUserId,
    winID: RESULT_WIN_ID,
    lossID: RESULT_LOSS_ID,
  });
  const {
    allDealsStatWLHours,
    allTotalCountHours,
    allTotalWinHours,
    allTotalLossHours,
    allDealsStatWLDays,
    allTotalCountDays,
    allTotalWinDays,
    allTotalLossDays,
  } = useDealsStatisticsAdmin({
    winID: RESULT_WIN_ID,
    lossID: RESULT_LOSS_ID,
  });
  const {
    currentDealOptions,
    isThereDeal,
    onClickDealImg,
    onCloseModal,
    onPrevDeal,
    onNextDeal,
  } = useDealModalCarousel({ deals });

  if (users.length === 0) {
    return (
      <div className="h-[calc(100vh-132px)] text-lg font-semibold text-center">
        <BeatLoader />
      </div>
    );
  }

  const handleResetSelects = (state) => {
    if (state === "closed") {
      onSelectUser("");
      onSelectSheet("");
    }
  };

  return (
    <main>
      <Accordion type="single" collapsible className="w-full mt-8">
        <AccordionItem
          value="item-1"
          onClick={(e) => handleResetSelects(e.target.dataset.state)}
        >
          <AccordionTrigger className="px-5">
            Просмотр журналов пользователей
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <AdminSelect
              users={users}
              onSelectUser={onSelectUser}
              sheets={sheets}
              isSelectUserId={!!selectUserId}
              onSelectSheet={onSelectSheet}
            />

            {!!selectSheetId && (
              <SheetWrapper className="md:h-[calc(100vh-168px)] h-[calc(100vh-240px)]">
                <CurrentDateStatistics
                  dealsStatWLHours={dealsStatWLHours}
                  dealsStatWLDays={dealsStatWLDays}
                />

                <Table
                  userId={user.id}
                  deals={deals}
                  dealsInfo={dealsInfo}
                  isSortingEnabled={isSortingEnabled}
                  sheetId={selectSheetId}
                  onSort={onSortDeals}
                  onResetSort={onResetSortDeals}
                  results={results}
                  longShorts={longShorts}
                  risksRewarsData={risksRewards}
                  tagsData={tags}
                  onClickDealImg={onClickDealImg}
                  isAdmin={true}
                />

                <DealScreenshotModal
                  isOpen={currentDealOptions}
                  isThereDeal={isThereDeal}
                  deal={currentDealOptions?.deal}
                  currentScreen={currentDealOptions?.inputName}
                  onClose={onCloseModal}
                  onPrevDeal={onPrevDeal}
                  onNextDeal={onNextDeal}
                  isAdmin={true}
                  table={
                    <Table
                      userId={user.id}
                      deals={deals}
                      dealsInfo={dealsInfo}
                      isSortingEnabled={isSortingEnabled}
                      sheetId={selectSheetId}
                      onSort={onSortDeals}
                      onResetSort={onResetSortDeals}
                      results={results}
                      longShorts={longShorts}
                      risksRewarsData={risksRewards}
                      tagsData={tags}
                      onClickDealImg={onClickDealImg}
                      isAdmin={true}
                      isModal={true}
                      deal={currentDealOptions?.deal}
                    />
                  }
                />
              </SheetWrapper>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="px-5">
            Статистика W:L по часам (c 9 до 24)
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <DealsTimeStatistics
              deals={allDealsStatWLHours}
              totalCount={allTotalCountHours}
              totalWin={allTotalWinHours}
              totalLoss={allTotalLossHours}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="px-5">
            Статистика W:L по дням
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <DealsDaysStatistics
              deals={allDealsStatWLDays}
              totalCount={allTotalCountDays}
              totalWin={allTotalWinDays}
              totalLoss={allTotalLossDays}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
