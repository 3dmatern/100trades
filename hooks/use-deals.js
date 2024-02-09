import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getEntries } from "@/actions/entrie";

export function useDeals(sheetId) {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        if (sheetId) {
            const getData = async () => {
                const dealsData = await getEntries(sheetId);
                if (dealsData && dealsData.error) {
                    toast.error(dealsData.error);
                } else {
                    setDeals(dealsData);
                }
            };
            getData();
        } else {
            setDeals([]);
        }
    }, [sheetId]);

    return { deals };
}
