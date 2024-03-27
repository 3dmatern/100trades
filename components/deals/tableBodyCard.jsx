"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";
import { areTwoWorkdaysPassed } from "@/utils/areTwoWorkdaysPassed";
import { DAYS_HAVE_PASSED } from "@/constants";

import BodyCardName from "@/components/deals/common/bodyCardName";
import BodyCardPose from "@/components/deals/common/bodyCardPose";
import BodyCardRisk from "@/components/deals/common/bodyCardRisk";
import BodyCardProfit from "@/components/deals/common/bodyCardProfit";
// import BodyCardRisksRewards from "@/components/deals/common/bodyCardRisksRewards";
import BodyCardDate from "@/components/deals/common/bodyCardDate";
import BodyCardScreenshot from "@/components/deals/common/bodyCardScreenshot";
import BodyCardDeposit from "@/components/deals/common/bodyCardDeposit";
import BodyCardProgress from "@/components/deals/common/bodyCardProgress";
import BodyCardStress from "@/components/deals/common/bodyCardStress";
import BodyCardTags from "@/components/deals/common/bodyCardTags";
import BodyCardNotes from "@/components/deals/common/bodyCardNotes";
import BodyCardTakeScreenshot from "@/components/deals/common/bodyCardTakeScreenshot";
import BodyCardTimeInTrade from "@/components/deals/common/bodyCardTimeInTrade";
import BodyCardResult from "@/components/deals/common/bodyCardResult";
import BodyCardLongShort from "@/components/deals/common/bodyCardLongShort";

export default function TableBodyCard({
  userId,
  sheetId,
  deal,
  selectedDeals,
  results,
  longShorts,
  // allRRs,
  // onChangeAllRRs,
  allTags,
  onUpdateAllTags,
  columnWidth,
  onCheckDeal,
  isPending,
  onActionDeal,
  onClickDealImg,
  isCreate = false,
  isAdmin,
  isModal,
  isPublished,
  lossID,
}) {
  const [hover, setHover] = useState(false);
  const isLoss = deal?.resultId === lossID;
  const passedDays = areTwoWorkdaysPassed(deal?.exitDate);
  const isPassedTwoDays = passedDays >= DAYS_HAVE_PASSED;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex items-center h-8 border-b border-slate-300 relative ${
        selectedDeals?.includes(deal?.id) || hover ? "bg-slate-50" : "bg-white"
      }`}
    >
      {isPublished && deal?.name === undefined ? null : (
        <BodyCardName
          dealId={deal?.id}
          dealName={deal?.name}
          dealNumber={deal?.number}
          selectedDeals={selectedDeals}
          dealHover={hover}
          columnWidth={columnWidth["name"]}
          onCheckDeal={onCheckDeal}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isModal={isModal}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.resultId === undefined ? null : (
        <BodyCardResult
          dealId={deal?.id}
          resultId={deal?.resultId}
          results={results}
          columnWidth={columnWidth["resultId"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
          dealLimitionDateWithTime={dealLimitionDateWithTime}
        />
      )}
      {isPublished && deal?.lsId === undefined ? null : (
        <BodyCardLongShort
          dealId={deal?.id}
          lsId={deal?.lsId}
          longShorts={longShorts}
          columnWidth={columnWidth["lsId"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.pose === undefined ? null : (
        <BodyCardPose
          dealId={deal?.id}
          dealPose={deal?.pose}
          dealHover={hover}
          columnWidth={columnWidth["pose"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isCreate={isCreate}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.risk === undefined ? null : (
        <BodyCardRisk
          dealId={deal?.id}
          dealRisk={deal?.risk}
          dealHover={hover}
          selectedDeals={selectedDeals}
          columnWidth={columnWidth["risk"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isCreate={isCreate}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.profit === undefined ? null : (
        <BodyCardProfit
          dealId={deal?.id}
          dealProfit={deal?.profit}
          dealHover={hover}
          selectedDeals={selectedDeals}
          columnWidth={columnWidth["profit"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isCreate={isCreate}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {/* {isPublished && deal?.rrId === undefined ? null : (
                <BodyCardRisksRewards
                    userId={userId}
                    dealId={deal?.id}
                    rrId={deal?.rrId}
                    allRRs={allRRs}
                    onChangeAllRRs={onChangeAllRRs}
                    columnWidth={columnWidth["rrId"]}
                    determineTextColor={determineTextColor}
                    onActionDeal={onActionDeal}
                    isAdmin={isAdmin}
                    isPublished={isPublished}
                />
            )} */}
      {isPublished && deal?.entryDate === undefined ? null : (
        <BodyCardDate
          dealId={deal?.id}
          inputName="entryDate"
          dealDate={deal?.entryDate}
          maxDate={dealLimitionDateWithTime(new Date())}
          columnWidth={columnWidth["entryDate"]}
          isPending={isPending}
          disabled={deal?.exitDate}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.imageStart === undefined
        ? null
        : !isModal && (
            <BodyCardScreenshot
              deal={deal}
              inputName="imageStart"
              dealImageSrc={deal?.imageStart}
              imageAlt="screenshot start"
              width={49}
              height={25}
              columnWidth={columnWidth["imageStart"]}
              isPending={isPending}
              onActionDeal={onActionDeal}
              onClickDealImg={onClickDealImg}
              isAdmin={isAdmin}
              isPublished={isPublished}
            />
          )}
      {isPublished && deal?.deposit === undefined ? null : (
        <BodyCardDeposit
          dealId={deal?.id}
          dealDeposit={deal?.deposit}
          dealHover={hover}
          columnWidth={columnWidth["deposit"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isCreate={isCreate}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.progress === undefined ? null : (
        <BodyCardProgress
          dealProgress={deal?.progress}
          columnWidth={columnWidth["progress"]}
        />
      )}
      {isPublished && deal?.exitDate === undefined ? null : (
        <BodyCardDate
          sheetId={sheetId}
          dealId={deal?.id}
          inputName="exitDate"
          dealDate={deal?.exitDate}
          minDate={deal?.entryDate && dealLimitionDateWithTime(deal?.entryDate)}
          maxDate={dealLimitionDateWithTime(new Date())}
          disabled={!deal?.entryDate}
          columnWidth={columnWidth["exitDate"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.imageStart === undefined
        ? null
        : !isModal && (
            <BodyCardScreenshot
              deal={deal}
              inputName="imageEnd"
              dealImageSrc={deal?.imageEnd}
              imageAlt="screenshot end"
              width={49}
              height={25}
              columnWidth={columnWidth["imageEnd"]}
              isPending={isPending}
              onActionDeal={onActionDeal}
              onClickDealImg={onClickDealImg}
              isAdmin={isAdmin}
              isPublished={isPublished}
            />
          )}
      {isPublished && deal?.take === undefined ? null : (
        <BodyCardTakeScreenshot
          takeScreenshot={deal?.take}
          isLoss={isLoss && isPassedTwoDays}
          dealImageEndSrc={deal?.imageEnd}
          columnWidth={columnWidth["take"]}
        />
      )}
      {isPublished && deal?.stress === undefined ? null : (
        <BodyCardStress
          dealId={deal?.id}
          dealStress={deal?.stress}
          columnWidth={columnWidth["stress"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.entrieTag === undefined ? null : (
        <BodyCardTags
          userId={userId}
          dealId={deal?.id}
          allTags={allTags}
          onUpdateAllTags={onUpdateAllTags}
          columnWidth={columnWidth["entrieTag"]}
          dealHover={hover}
          selectedDeals={selectedDeals}
          determineTextColor={determineTextColor}
          getRandomHexColor={getRandomHexColor}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.notes === undefined ? null : (
        <BodyCardNotes
          dealId={deal?.id}
          dealNotes={deal?.notes}
          columnWidth={columnWidth["notes"]}
          isPending={isPending}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {isPublished && deal?.timeInTrade === undefined ? null : (
        <BodyCardTimeInTrade
          timeInTrade={deal?.timeInTrade}
          columnWidth={columnWidth["timeInTrade"]}
        />
      )}
    </div>
  );
}
