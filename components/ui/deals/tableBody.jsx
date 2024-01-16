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
    return (
        <div className="table-row-group border border-slate-300 bg-white">
            {deals?.map((deal, index) => (
                <TableBodyCard
                    key={deal.id}
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
            ))}
        </div>
    );
}
