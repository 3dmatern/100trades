import { useEffect, useState } from "react";

import { getSheetPublished } from "@/actions/sheetPublished";

import NotFound from "@/app/not-found";

export function useSheetPublished(sheetId, onSort, onResetSort) {
    const [sheetPublished, setSheetPublished] = useState(undefined);
    const [dealsInfo, setDealsInfo] = useState([]);
    const [isSortingEnabled, setIsSortingEnabled] = useState(false);

    useEffect(() => {
        if (sheetId) {
            const getData = async () => {
                const sheetPublished = await getSheetPublished(sheetId);

                if (!sheetPublished) {
                    return <NotFound />;
                } else {
                    setSheetPublished((prev) => sheetPublished);
                    setDealsInfo((prev) => sheetPublished.deals);
                }
            };
            getData();
        }
    }, [sheetId]);

    const handleSort = (data) => {
        setIsSortingEnabled(true);
        setSheetPublished((prev) => {
            const filteredDeals = onSort(prev.deals, data);
            return {
                ...prev,
                deals: filteredDeals,
            };
        });
    };

    const handleResetSort = () => {
        setIsSortingEnabled(false);
        setSheetPublished((prev) => {
            const resetDeals = onResetSort(prev.deals);
            return {
                ...prev,
                deals: resetDeals,
            };
        });
    };

    return {
        sheetPublished,
        dealsInfo,
        isSortingEnabled,
        onSortDeals: handleSort,
        onResetSortDeals: handleResetSort,
    };
}
