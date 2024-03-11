import { useEffect, useState } from "react";
import { toast } from "sonner";

import { deleteFile } from "@/actions/files";

export function useDealModalCarousel({ deals, onUpdateDeal }) {
    const [currentDealOptions, setCurrentDealOptions] = useState(undefined);
    const [dealsWithImage, setDealsWithImage] = useState([]);
    const [isThereDeal, setIsThereDeal] = useState({
        prevDeal: false,
        nextDeal: false,
    });

    useEffect(() => {
        if (currentDealOptions && deals) {
            const filteredDeals = deals.filter(
                (deal) => deal.imageStart || deal.imageEnd
            );
            const indexCurrentDeal = filteredDeals.findIndex(
                (deal) => deal.id === currentDealOptions.deal.id
            );

            setDealsWithImage((prev) => filteredDeals);

            if (
                indexCurrentDeal > 0 &&
                indexCurrentDeal < filteredDeals.length - 1
            ) {
                setIsThereDeal((prev) => ({
                    ...prev,
                    prevDeal: true,
                    nextDeal: true,
                }));
            } else if (indexCurrentDeal === 0) {
                setIsThereDeal((prev) => ({
                    ...prev,
                    prevDeal: false,
                    nextDeal: true,
                }));
            } else if (indexCurrentDeal === filteredDeals.length - 1) {
                setIsThereDeal((prev) => ({
                    ...prev,
                    prevDeal: true,
                    nextDeal: false,
                }));
            } else {
                setIsThereDeal((prev) => ({
                    ...prev,
                    prevDeal: false,
                    nextDeal: false,
                }));
            }
        }
    }, [currentDealOptions, deals]);

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
        const isConfirm = window.confirm(
            "Вы уверены, что хотите удалить скриншот?"
        );
        if (isConfirm) {
            onUpdateDeal({
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
        }
    };

    const handleCloseModal = () => {
        setCurrentDealOptions((prev) => undefined);
    };

    const handlePrevDeal = () => {
        const indexCurrentDeal = dealsWithImage.findIndex(
            (deal) => deal.id === currentDealOptions.deal.id
        );
        const findPrevDeal = dealsWithImage[indexCurrentDeal - 1];
        handleClickDealImg({ deal: findPrevDeal, inputName: "imageStart" });
    };

    const handleNextDeal = () => {
        const indexCurrentDeal = dealsWithImage.findIndex(
            (deal) => deal.id === currentDealOptions.deal.id
        );
        const findNextDeal = dealsWithImage[indexCurrentDeal + 1];
        handleClickDealImg({ deal: findNextDeal, inputName: "imageStart" });
    };

    return {
        currentDealOptions,
        isThereDeal,
        onClickDealImg: handleClickDealImg,
        onRemoveImg: handleRemoveImg,
        onCloseModal: handleCloseModal,
        onPrevDeal: handlePrevDeal,
        onNextDeal: handleNextDeal,
    };
}
