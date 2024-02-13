"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";
import { useDeals } from "@/hooks/use-deals";

import { deleteFile } from "@/actions/files";

import SheetWrapper from "@/components/sheet/sheetWrapper";
import Sheets from "@/components/sheet/sheets";
import Table from "@/components/deals/table";
import { DealScreenshotModal } from "@/components/ui/deal-screenshot-modal";
import { useLongShort } from "@/hooks/use-long-short";

export default function SheetPage({ params }) {
    const { id } = params;
    const router = useRouter();
    const user = useCurrentUser();
    const { sheets, handleSheetUpdate, handleRemoveSheet } = useSheets(user.id);
    const { results } = useResults();
    const { longShorts } = useLongShort();
    const { risksRewards } = useRisksRewards();
    const {
        deals,
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
    } = useDeals(user.id, id, results, longShorts, risksRewards);
    const { tags } = useTags(user.id);
    const [currentDealOptions, setCurrentDealOptions] = useState(undefined);

    const handleClickDealImg = ({ deal, inputName }) => {
        setCurrentDealOptions((prev) => ({
            deal: {
                ...prev?.deal,
                ...deal,
            },
            inputName,
        }));
    };

    const handleRemoveImg = async (payload) => {
        onUpdateDeal(user.id, {
            id: payload.dealId,
            [payload.inputName]: "",
        });

        deleteFile(payload.fileName).then((data) => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            if (data.success) {
                toast.success(data.success);
            }
        });

        setCurrentDealOptions((prev) => undefined);
    };

    const handleCloseModal = () => {
        setCurrentDealOptions((prev) => undefined);
    };

    useEffect(() => {
        if (sheets && sheets.length === 0) {
            router.push("/sheets");
        }
    }, [router, sheets]);

    useEffect(() => {
        const handleKyeDown = (e) => {
            if (e.key === "Escape" && currentDealOptions) {
                setCurrentDealOptions(undefined);
            }
        };

        document.addEventListener("keydown", handleKyeDown);
        return () => {
            document.removeEventListener("keydown", handleKyeDown);
        };
    }, [currentDealOptions]);

    return (
        <SheetWrapper className="md:h-[calc(100vh-132px)] h-[calc(100vh-172px)]">
            <Sheets
                userId={user.id}
                sheets={sheets}
                sheetId={id}
                onSheetUpdate={handleSheetUpdate}
                onRemoveSheet={handleRemoveSheet}
            />

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
                onSort={onSort}
                onResetSort={onResetSort}
                resultsData={results}
                longShorts={longShorts}
                risksRewarsData={risksRewards}
                tagsData={tags}
                onClickDealImg={handleClickDealImg}
            />

            <DealScreenshotModal
                isOpen={currentDealOptions}
                deal={currentDealOptions?.deal}
                currentScreen={currentDealOptions?.inputName}
                onRemove={handleRemoveImg}
                onClose={handleCloseModal}
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
                        onSort={onSort}
                        onResetSort={onResetSort}
                        resultsData={results}
                        longShorts={longShorts}
                        risksRewarsData={risksRewards}
                        tagsData={tags}
                        onClickDealImg={handleClickDealImg}
                        isModal={true}
                        deal={currentDealOptions?.deal}
                    />
                }
            />
        </SheetWrapper>
    );
}
