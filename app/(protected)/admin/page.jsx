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
import { useDealsStatisticsAdmin } from "@/hooks/use-deals-statistics-admin";
import { useTakes } from "@/hooks/use-takes";

import { UiContainer } from "@/components/uikit/uiContainer";
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
import { DealsDaysStatistics } from "@/components/statistics";
import { CurrentDateStatistics } from "@/components/statistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function AdminPage() {
  const user = useCurrentUser();
  const { users, selectUserId, onSelectUser } = useAdminUsersState({
    user,
  });
  const { sheets, selectSheetId, onSelectSheet } = useSheets({ userId: selectUserId });
  const { results } = useResults();
  const { longShorts } = useLongShort();
  const { risksRewards } = useRisksRewards();
  const {
    tags,
  } = useTags({ userId: selectUserId });
  const { takes } = useTakes(selectUserId);
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
      longShorts,
      risksRewards,
      onSort,
      onResetSort,
    });
  const { hoursWLStat, daysWLStat, dealsInfoStat } =
    useDealsStatistics({
      userId: selectUserId,
      winID: RESULT_WIN_ID,
      lossID: RESULT_LOSS_ID,
      dealsInfo,
      results,
    });
  const { allHoursWLStat, allDaysWLStat } = useDealsStatisticsAdmin({
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
      <UiContainer className="flex items-center justify-center">
        <BeatLoader />
      </UiContainer>
    );
  }

  const handleResetSelects = (state) => {
    if (state === "closed") {
      onSelectUser("");
      onSelectSheet("");
    }
  };

  return (
    <UiContainer className="pt-8 px-1">
      <Accordion type="single" collapsible>
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
                  dealsStatWLHours={hoursWLStat?.dealsStat}
                  dealsStatWLDays={daysWLStat?.dealsStat}
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
                  takesData={takes}
                  onClickDealImg={onClickDealImg}
                  isAdmin={true}
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
                      takesData={takes}
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
            <DealsTimeStatistics hoursWLStat={allHoursWLStat} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="px-5">
            Статистика W:L по дням
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <DealsDaysStatistics daysWLStat={allDaysWLStat} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </UiContainer>
  );
}
