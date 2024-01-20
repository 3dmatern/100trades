"use client";

import { BeatLoader } from "react-spinners";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";

export default function TableBody({
    userId,
    sheetId,
    sortedDeals,
    selectedDeals,
    results,
    allRRs,
    onChangeAllRRs,
    allTags,
    onUpdateAllTags,
    checkAll,
    columnWidth,
    onCheckDeal,
    isPending,
    onUpdateDeal,
}) {
    // console.log(sortedDeals);
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
                onChangeAllRRs={onChangeAllRRs}
                allTags={allTags}
                onUpdateAllTags={onUpdateAllTags}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onCheckDeal={onCheckDeal}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
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
