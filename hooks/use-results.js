import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getResults } from "@/actions/result";

export function useResults() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const resultsData = await getResults();
            if (resultsData && resultsData.error) {
                toast.error(resultsData.error);
            } else {
                setResults(resultsData);
            }
        };
        getData();
    }, []);

    return { results };
}
