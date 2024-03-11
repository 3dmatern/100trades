"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useLongShort } from "@/hooks/use-long-short";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";
import { useDeals } from "@/hooks/use-deals";
import { useSortedDeals } from "@/hooks/use-deals-sorted";
import { useDealModalCarousel } from "@/hooks/use-deal-modal-carousel";

import { useAdminUsersState } from "@/components/admin/use-admin-users-state";

import { Admin } from "@/components/admin";
import SheetWrapper from "@/components/sheet/sheetWrapper";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/deal-screenshot-modal";

export default function AdminPage() {
    const user = useCurrentUser();
    const { users, selectUserId, handleSelectUser } = useAdminUsersState(user);
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
                Пользователей нет.
            </div>
        );
    }

    return (
        <main>
            <Admin
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
                        currentScreen={currentDealOptions?.inputName}
                        onClose={onCloseModal}
                        onPrevDeal={onPrevDeal}
                        onNextDeal={onNextDeal}
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
        </main>
    );
}
