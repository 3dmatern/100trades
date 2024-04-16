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
// import BodyCardForecast from "./common/bodyCardForecast";
import BodyCardTakes from "./common/bodyCardTakes";
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
  allTakes,
  onUpdateAllTakes,
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
  currentSheetColumns
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
      {currentSheetColumns?.name === null
        || (isPublished && currentSheetColumns?.name === null)
        ? null
        : (
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
      {currentSheetColumns?.resultId === null
        || (isPublished && currentSheetColumns?.resultId === null)
        ? null 
        : (
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
      {currentSheetColumns?.lsId === null
        || (isPublished && currentSheetColumns?.lsId === null)
        ? null 
        : (
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
      {currentSheetColumns?.pose === null
        || (isPublished && currentSheetColumns?.pose === null)
        ? null 
        : (
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
      {currentSheetColumns?.risk === null
        || (isPublished && currentSheetColumns?.risk === null)
        ? null 
        : (
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
      {currentSheetColumns?.profit === null
        || (isPublished && currentSheetColumns?.profit === null)
        ? null 
        : (
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
      {/* {currentSheetColumns?.forecast === null
        || (isPublished && currentSheetColumns?.forecast === null)
        ? null 
        : (
        <BodyCardForecast
          dealPose={deal?.forecast}
          columnWidth={columnWidth["forecast"]}
        />
      )} */}
      {currentSheetColumns?.entrieTake === null
        || (isPublished && currentSheetColumns?.entrieTake === null)
        ? null 
        : (
        <BodyCardTakes
          userId={userId}
          dealId={deal?.id}
          allTakes={allTakes}
          onUpdateAllTakes={onUpdateAllTakes}
          columnWidth={columnWidth["entrieTake"]}
          dealHover={hover}
          selectedDeals={selectedDeals}
          determineTextColor={determineTextColor}
          getRandomHexColor={getRandomHexColor}
          onActionDeal={onActionDeal}
          isAdmin={isAdmin}
          isPublished={isPublished}
        />
      )}
      {/* {currentSheetColumns?.rrId === null
        || (isPublished && currentSheetColumns?.rrId === null)
        ? null 
        : (
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
      {currentSheetColumns?.entryDate === null
        || (isPublished && currentSheetColumns?.entryDate === null)
        ? null 
        : (
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
      {currentSheetColumns?.imageStart === null
        || (isPublished && currentSheetColumns?.imageStart === null)
               
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
      {currentSheetColumns?.deposit === null
        || (isPublished && currentSheetColumns?.deposit === null)
        ? null 
        : (
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
      {currentSheetColumns?.progress === null
        || (isPublished && currentSheetColumns?.progress === null)
        ? null 
        : (
        <BodyCardProgress
          dealProgress={deal?.progress}
          columnWidth={columnWidth["progress"]}
        />
      )}
      {currentSheetColumns?.exitDate === null
        || (isPublished && currentSheetColumns?.exitDate === null)
        ? null 
        : (
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
      {currentSheetColumns?.imageEnd === null
        || (isPublished && currentSheetColumns?.imageEnd === null)
               
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
      {currentSheetColumns?.take === null
        || (isPublished && currentSheetColumns?.take === null)
        ? null 
        : (
        <BodyCardTakeScreenshot
          takeScreenshot={deal?.take}
          isLoss={isLoss && isPassedTwoDays}
          dealImageEndSrc={deal?.imageEnd}
          columnWidth={columnWidth["take"]}
        />
      )}
      {currentSheetColumns?.stress === null
        || (isPublished && currentSheetColumns?.stress === null)
        ? null 
        : (
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
      {currentSheetColumns?.entrieTag === null
        || (isPublished && currentSheetColumns?.entrieTag === null)
        ? null 
        : (
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
      {currentSheetColumns?.notes === null
        || (isPublished && currentSheetColumns?.notes === null)
        ? null 
        : (
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
      {currentSheetColumns?.timeInTrade === null
        || (isPublished && currentSheetColumns?.timeInTrade === null)
        ? null 
        : (
        <BodyCardTimeInTrade
          timeInTrade={deal?.timeInTrade}
          columnWidth={columnWidth["timeInTrade"]}
        />
      )}
    </div>
  );
}
