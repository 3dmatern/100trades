"use client";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";
import { sortByAscString, sortByDescString } from "@/utils/sortBy";
import { useEffect, useState } from "react";

export default function TableBody({
    userId,
    sheetId,
    deals,
    selectedDeals,
    results,
    risksRewards,
    tags,
    checkAll,
    columnWidth,
    onCheckDeal,
}) {
    const [sortedDeals, setSortedDeals] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allRRs, setAllRRs] = useState([]);

    const changeAllRRs = (rr) => {
        setAllTags((prev) => [...prev, rr]);
    };

    const changeAllTags = (tag) => {
        setAllTags((prev) => [...prev, tag]);
    };

    const handleSort = (data) => {
        switch (data.iter) {
            case "name":
                data.order === "asc"
                    ? setSortedDeals(sortByAscString(deals))
                    : setSortedDeals(sortByDescString(deals));
                break;
            case "result":
                data.order === "asc"
                    ? setSortedDeals(sortByAscString(deals))
                    : setSortedDeals(sortByDescString(deals));
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        if (deals) {
            setSortedDeals(deals);
        }
    }, [deals]);

    useEffect(() => {
        if (risksRewards) {
            setAllRRs(risksRewards);
        }
    }, [risksRewards]);

    useEffect(() => {
        if (tags) {
            setAllTags(tags);
        }
    }, [tags]);

    return sortedDeals?.map((deal, index) => (
        <TableBodyCard
            key={deal.id}
            userId={userId}
            sheetId={sheetId}
            index={index}
            deal={deal}
            selectedDeals={selectedDeals}
            results={results}
            allRRs={allRRs}
            onChangeAllRRs={changeAllRRs}
            allTags={allTags}
            onChangeAllTags={changeAllTags}
            checkAll={checkAll}
            columnWidth={columnWidth}
            onCheckDeal={onCheckDeal}
        />
    ));
}
