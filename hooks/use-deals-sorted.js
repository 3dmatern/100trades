import {
    sortByAsc,
    sortByAscDate,
    sortByAscRR,
    sortByAscSelect,
    sortByAscString,
    sortByDesc,
    sortByDescDate,
    sortByDescRR,
    sortByDescSelect,
    sortByDescString,
} from "@/utils/sortBy";

export function useSortedDeals(results, longShorts, risksRewards) {
    let filteredDeals = [];

    const handleSort = (deals, data) => {
        const sortByOrderString = ({ iter, order }) => {
            order === "asc"
                ? (filteredDeals = sortByAscString(deals, iter))
                : (filteredDeals = sortByDescString(deals, iter));
        };

        const sortByOrderNumber = ({ iter, order }) => {
            order === "asc"
                ? (filteredDeals = sortByAsc(deals, iter))
                : (filteredDeals = sortByDesc(deals, iter));
        };

        const sortByOrderSelect = ({ iter, order }) => {
            if (iter === "resultId") {
                order === "asc"
                    ? (filteredDeals = sortByAscSelect(deals, iter, results))
                    : (filteredDeals = sortByDescSelect(deals, iter, results));
            } else {
                order === "asc"
                    ? (filteredDeals = sortByAscSelect(deals, iter, longShorts))
                    : (filteredDeals = sortByDescSelect(
                          deals,
                          iter,
                          longShorts
                      ));
            }
        };

        const sortByOrderRR = ({ iter, order }) => {
            order === "asc"
                ? (filteredDeals = sortByAscRR(deals, iter, risksRewards))
                : (filteredDeals = sortByDescRR(deals, iter, risksRewards));
        };

        const sortByOrderDate = ({ iter, order }) => {
            order === "asc"
                ? (filteredDeals = sortByAscDate(deals, iter))
                : (filteredDeals = sortByDescDate(deals, iter));
        };

        switch (data?.iter) {
            case "name":
            case "take":
            case "notes":
            case "progress":
                sortByOrderString(data);
                break;

            case "pose":
            case "risk":
            case "profit":
            case "deposit":
            case "stress":
            case "timeInTrade":
                sortByOrderNumber(data);
                break;

            case "resultId":
            case "lsId":
                sortByOrderSelect(data);
                break;

            case "rrId":
                sortByOrderRR(data);
                break;

            case "entryDate":
            case "exitDate":
                sortByOrderDate(data);
                break;

            default:
                break;
        }

        return filteredDeals;
    };

    const handleResetSort = (deals) => {
        return deals.slice().sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    };

    return {
        onSort: handleSort,
        onResetSort: handleResetSort,
    };
}
