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
    onChangeAllTags,
    checkAll,
    columnWidth,
    onCheckDeal,
    onChangeDeal,
    isPending,
    onUpdateDeal,
}) {
    console.log(isPending);
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
                onChangeAllTags={onChangeAllTags}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onCheckDeal={onCheckDeal}
                onChangeDeal={onChangeDeal}
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
