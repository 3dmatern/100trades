"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";

import SheetWrapper from "@/components/sheet/sheetWrapper";
import Sheets from "@/components/sheet/sheets";
import Table from "@/components/deals/table";
import { deleteFile } from "@/actions/files";
import { DealScreenshotModal } from "@/components/ui/deal-screenshot-modal";

export default function SheetPage({ params }) {
    const { id } = params;
    const router = useRouter();
    const user = useCurrentUser();
    const { sheets, handleSheetUpdate, handleRemoveSheet } = useSheets(user.id);
    const { results } = useResults();
    const { risksRewards } = useRisksRewards();
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

    const handleRemoveImg = (payload) => {
        onUpdateDeal({ id: payload.dealId, [payload.inputName]: "" });

        deleteFile(payload.fileName).then((data) => {
            if (data.error) {
                toast.error(data.error);
                return;
            }
            if (data.success) {
                toast.success(data.success);
                setOpenImage(false);
            }
        });

        setCurrentDealOptions((prev) => undefined);
    };

    const handleCloseModal = () => {
        setCurrentDealOptions((prev) => undefined);
    };

    useEffect(() => {
        if (sheets && sheets.length === 0) {
            console.log("page");
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
                sheetId={id}
                resultsData={results}
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
            />
        </SheetWrapper>
    );
}
