import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getLongShorts } from "@/actions/longShort";

export function useLongShort() {
    const [longShorts, setLongShorts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const longShortsData = await getLongShorts();
            if (longShortsData && longShortsData.error) {
                toast.error(longShortsData.error);
            } else {
                setLongShorts(longShortsData);
            }
        };
        getData();
    }, []);

    return { longShorts };
}
