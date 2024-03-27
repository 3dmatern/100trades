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
  isModal,
  isPublished,
  lossID,
}) {
  return deals && deals.length >= 0 ? (
    <>
      {!isModal && !isAdmin && !isPublished && (
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
          onActionDeal={onCreateDeal}
          isCreate={true}
        />
      )}
      {deals?.map((deal) => (
        <TableBodyCard
          key={deal.id}
          userId={userId}
          sheetId={sheetId}
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
          onActionDeal={onUpdateDeal}
          onClickDealImg={onClickDealImg}
          isAdmin={isAdmin}
          isModal={isModal}
          isPublished={isPublished}
          lossID={lossID}
        />
      ))}
    </>
  ) : (
    <div className={`flex items-center justify-center h-8`}>
      <BeatLoader />
    </div>
  );
}
