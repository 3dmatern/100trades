import { useEffect, useState } from "react";

import { getSheetPublished } from "@/actions/sheetPublished";

import NotFound from "@/app/not-found";

export function useSheetPublished(sheetId, onSort, onResetSort) {
  const [sheetPublished, setSheetPublished] = useState(undefined);
  const [dealsInfo, setDealsInfo] = useState([]);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);
  const [currentSheetColumns, setCurrentSheetColumns] = useState([]);

  useEffect(() => {
    if (sheetId) {
      const getData = async () => {
        const sheetData = await getSheetPublished(sheetId);

        if (!sheetData || sheetData.error) {
          return <NotFound />;
        }

        if (sheetData) {
          const currentColumns = sheetData?.sheetPublished;

          setSheetPublished((prev) => sheetData);
          setDealsInfo((prev) => sheetData.deals);
          setCurrentSheetColumns((prev) => currentColumns);
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
    currentSheetColumns,
    onSortDeals: handleSort,
    onResetSortDeals: handleResetSort,
  };
}
