import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getRisksRewards } from "@/actions/riskReward";

export function useRisksRewards() {
    const [risksRewards, setRisksRewards] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const rrData = await getRisksRewards();
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
