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
import { DealsTimeStatistics } from "@/components/deals/dealsTimeStatistics";
import SheetWrapper from "@/components/sheet/sheetWrapper";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/dealScreenshotModal";
import { DealsDaysStatistics } from "@/components/deals/dealsDaysStatistics";

const RESULT_WIN_ID = process.env.NEXT_PUBLIC_RESULT_WIN_ID;
const RESULT_LOSS_ID = process.env.NEXT_PUBLIC_RESULT_LOSS_ID;

export default function AdminPage() {
    const user = useCurrentUser();
    const {
        dealsStatWLHours,
        totalCountHours,
        totalWinHours,
        totalLossHours,
        dealsStatWLDays,
        totalCountDays,
        totalWinDays,
        totalLossDays,
    } = useDealsStatistics({
        isAdmin: true,
        winID: RESULT_WIN_ID,
        lossID: RESULT_LOSS_ID,
    });
    const { users, selectUserId, handleSelectUser } = useAdminUsersState({
        user,
    });
    const { sheets, selectSheetId, handleSelectSheet } =
        useSheets(selectUserId);
    const { results } = useResults();
    const { longShorts } = useLongShort();
    const { risksRewards } = useRisksRewards();
    const { tags } = useTags(selectUserId);
    const { onSort, onResetSort } = useSortedDeals(
        results,
        longShorts,
        risksRewards
    );
    const {
        deals,
        dealsInfo,
        isSortingEnabled,
        onSortDeals,
        onResetSortDeals,
    } = useDeals({
        isAdmin: true,
        userId: user.id,
        sheetId: selectSheetId,
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

    return (
        <main>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                onClick={() => {
                    handleSelectUser("");
                    handleSelectSheet("");
                }}
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-5">
                        Просмотр журналов пользователей
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <AdminSelect
                            users={users}
                            onSelectUser={handleSelectUser}
                            sheets={sheets}
                            isSelectUserId={!!selectUserId}
                            onSelectSheet={handleSelectSheet}
                        />

                        {!!selectSheetId && (
                            <SheetWrapper className="md:h-[calc(100vh-168px)] h-[calc(100vh-240px)]">
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
                                    currentScreen={
                                        currentDealOptions?.inputName
                                    }
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
                            deals={dealsStatWLHours}
                            totalCount={totalCountHours}
                            totalWin={totalWinHours}
                            totalLoss={totalLossHours}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="px-5">
                        Статистика W:L по дням
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                        <DealsDaysStatistics
                            deals={dealsStatWLDays}
                            totalCount={totalCountDays}
                            totalWin={totalWinDays}
                            totalLoss={totalLossDays}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
}
