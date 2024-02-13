import { BeatLoader } from "react-spinners";

import TableBodyCard from "@/components/deals/tableBodyCard";

export default function TableBody({
    userId,
    sheetId,
    deals,
    selectedDeals,
    results,
    longShorts,
    allRRs,
    onChangeAllRRs,
    allTags,
    onUpdateAllTags,
    columnWidth,
    onCheckDeal,
    isPending,
    onCreateDeal,
    onUpdateDeal,
    onClickDealImg,
    isAdmin,
}) {
    return deals && deals.length >= 0 ? (
        <>
            {deals?.map((deal, index) => (
                <TableBodyCard
                    key={deal.id}
                    userId={userId}
                    sheetId={sheetId}
                    index={index}
                    deal={deal}
                    selectedDeals={selectedDeals}
                    results={results}
                    longShorts={longShorts}
                    allRRs={allRRs}
                    onChangeAllRRs={onChangeAllRRs}
                    allTags={allTags}
                    onUpdateAllTags={onUpdateAllTags}
                    columnWidth={columnWidth}
                    onCheckDeal={onCheckDeal}
                    isPending={isPending}
                    onUpdateDeal={onUpdateDeal}
                    onClickDealImg={onClickDealImg}
                    isAdmin={isAdmin}
                />
            ))}
            <TableBodyCard
                userId={userId}
                sheetId={sheetId}
                index={deals.length}
                results={results}
                longShorts={longShorts}
                allRRs={allRRs}
                onChangeAllRRs={onChangeAllRRs}
                allTags={allTags}
                onUpdateAllTags={onUpdateAllTags}
                columnWidth={columnWidth}
                onCheckDeal={onCheckDeal}
                onUpdateDeal={onCreateDeal}
                isAdmin={isAdmin}
            />
        </>
    ) : (
        <div
            className={`flex items-center justify-center h-8 border-l border-r border-b border-slate-300 bg-white`}
        >
            <BeatLoader />
        </div>
    );
}
