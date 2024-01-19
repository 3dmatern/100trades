"use client";

import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";

export default function TableBody({
    userId,
    sheetId,
    sortedDeals,
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
        setAllRRs((prev) => [...prev, rr]);
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

    return sortedDeals && sortedDeals.length >= 0 ? (
        sortedDeals?.map((deal, index) => (
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
        ))
    ) : (
        <div
            className={`flex items-center justify-center h-8 border-l border-r border-b border-slate-300 bg-white`}
        >
            <BeatLoader />
        </div>
    );
}
