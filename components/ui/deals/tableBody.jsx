"use client";

import { BeatLoader } from "react-spinners";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";

export default function TableBody({
    userId,
    sheetId,
    deals,
    selectedDeals,
    results,
    allRRs,
    onChangeAllRRs,
    allTags,
    onUpdateAllTags,
    columnWidth,
    onCheckDeal,
    isPending,
    onUpdateDeal,
}) {
    return deals && deals.length >= 0 ? (
        deals?.map((deal, index) => (
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
