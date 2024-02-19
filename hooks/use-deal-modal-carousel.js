import { useEffect, useState } from "react";
import { toast } from "sonner";

import { deleteFile } from "@/actions/files";

export function useDealModalCarousel(onUpdateDeal) {
    const [currentDealOptions, setCurrentDealOptions] = useState(undefined);

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

    return {
        currentDealOptions,
        onClickDealImg: handleClickDealImg,
        onRemoveImg: handleRemoveImg,
        onCloseModal: handleCloseModal,
    };
}
