import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getSheets } from "@/actions/sheet";

export function useSheets(userId) {
    const [sheets, setSheets] = useState([]);
    const [selectSheetId, setSelectSheetId] = useState("");

    useEffect(() => {
        if (userId) {
            const getData = async () => {
                const sheetsData = await getSheets(userId);
                if (sheetsData && sheetsData.error) {
                    toast.error(sheetsData.error);
                } else {
                    setSheets(sheetsData);
                }
            };
            getData();
        }
    }, [userId]);

    const handleSelectSheet = (sheetId) => {
        setSelectSheetId(sheetId);
    };

    return { sheets, selectSheetId, handleSelectSheet };
}
