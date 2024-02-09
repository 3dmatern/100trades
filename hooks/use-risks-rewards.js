import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getResults } from "@/actions/result";

export function useRisksRewards() {
    const [risksRewards, setRisksRewards] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const rrData = await getResults();
            if (rrData && rrData.error) {
                toast.error(rrData.error);
            } else {
                setRisksRewards(rrData);
            }
        };
        getData();
    }, []);

    return { risksRewards };
}
