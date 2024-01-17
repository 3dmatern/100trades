"use client";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";

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
    return deals?.map((deal, index) => (
        <div
            key={deal.id}
            className="table-row-group border h-8 border-slate-300 bg-white"
        >
            <TableBodyCard
                userId={userId}
                sheetId={sheetId}
                index={index}
                deal={deal}
                selectedDeals={selectedDeals}
                results={results}
                risksRewards={risksRewards}
                tags={tags}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onCheckDeal={onCheckDeal}
            />
        </div>
    ));
}
