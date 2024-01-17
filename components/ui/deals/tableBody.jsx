"use client";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";
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
    const [allTags, setAllTags] = useState([]);
    const [allRRs, setAllRRs] = useState([]);

    const changeAllRRs = (rr) => {
        setAllTags((prev) => [...prev, rr]);
    };

    const changeAllTags = (tag) => {
        setAllTags((prev) => [...prev, tag]);
    };

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

    return deals?.map((deal, index) => (
        <div
            key={deal.id}
            className="flex items-center h-8 border-x border-b border-slate-300 bg-white"
        >
            <TableBodyCard
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
        </div>
    ));
}
