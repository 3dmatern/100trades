"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";

import BodyCardName from "@/components/deals/common/bodyCardName";
import BodyCardPose from "@/components/deals/common/bodyCardPose";
import BodyCardRisk from "@/components/deals/common/bodyCardRisk";
import BodyCardProfit from "@/components/deals/common/bodyCardProfit";
import BodyCardRisksRewards from "@/components/deals/common/bodyCardRisksRewards";
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
    index,
    deal,
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
    onActionDeal,
    onClickDealImg,
    isAdmin,
    isModal,
}) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center h-8 border-b border-slate-300 relative ${
                selectedDeals?.includes(deal?.id) || hover
                    ? "bg-slate-50"
                    : "bg-white"
            }`}
        >
            <BodyCardName
                index={index}
                dealId={deal?.id}
                dealName={deal?.name}
                selectedDeals={selectedDeals}
                dealHover={hover}
                columnWidth={columnWidth.column1}
                onCheckDeal={onCheckDeal}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
                isModal={isModal}
            />
            <BodyCardResult
                dealId={deal?.id}
                resultId={deal?.resultId}
                results={results}
                columnWidth={columnWidth.column2}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardLongShort
                dealId={deal?.id}
                lsId={deal?.lsId}
                longShorts={longShorts}
                columnWidth={columnWidth.column3}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardPose
                dealId={deal?.id}
                dealPose={deal?.pose}
                dealHover={hover}
                columnWidth={columnWidth.column4}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardRisk
                dealId={deal?.id}
                dealRisk={deal?.risk}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column5}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardProfit
                dealId={deal?.id}
                dealProfit={deal?.profit}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column6}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardRisksRewards
                userId={userId}
                dealId={deal?.id}
                rrId={deal?.rrId}
                allRRs={allRRs}
                onChangeAllRRs={onChangeAllRRs}
                columnWidth={columnWidth.column7}
                determineTextColor={determineTextColor}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardDate
                dealId={deal?.id}
                inputName="entryDate"
                dealDate={deal?.entryDate}
                maxDate={dealLimitionDateWithTime(new Date())}
                columnWidth={columnWidth.column8}
                isPending={isPending}
                disabled={deal?.exitDate}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            {!isModal && (
                <BodyCardScreenshot
                    deal={deal}
                    inputName="imageStart"
                    dealImageSrc={deal?.imageStart}
                    imageAlt="screenshot start"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column9}
                    isPending={isPending}
                    onActionDeal={onActionDeal}
                    onClickDealImg={onClickDealImg}
                    isAdmin={isAdmin}
                />
            )}
            <BodyCardDeposit
                dealId={deal?.id}
                dealDeposit={deal?.deposit}
                dealHover={hover}
                columnWidth={columnWidth.column10}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardProgress
                dealProgress={deal?.progress}
                columnWidth={columnWidth.column11}
            />
            <BodyCardDate
                sheetId={sheetId}
                dealId={deal?.id}
                inputName="exitDate"
                dealDate={deal?.exitDate}
                minDate={
                    deal?.entryDate && dealLimitionDateWithTime(deal?.entryDate)
                }
                maxDate={dealLimitionDateWithTime(new Date())}
                disabled={!deal?.entryDate}
                columnWidth={columnWidth.column12}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            {!isModal && (
                <BodyCardScreenshot
                    deal={deal}
                    inputName="imageEnd"
                    dealImageSrc={deal?.imageEnd}
                    imageAlt="screenshot end"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column13}
                    isPending={isPending}
                    onActionDeal={onActionDeal}
                    onClickDealImg={onClickDealImg}
                    isAdmin={isAdmin}
                />
            )}
            <BodyCardTakeScreenshot
                takeScreenshot={deal?.take}
                dealImageEndSrc={deal?.imageEnd}
                columnWidth={columnWidth.column14}
            />
            <BodyCardStress
                dealId={deal?.id}
                dealStress={deal?.stress}
                columnWidth={columnWidth.column15}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardTags
                userId={userId}
                dealId={deal?.id}
                allTags={allTags}
                onUpdateAllTags={onUpdateAllTags}
                columnWidth={columnWidth.column16}
                dealHover={hover}
                selectedDeals={selectedDeals}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardNotes
                dealId={deal?.id}
                dealNotes={deal?.notes}
                columnWidth={columnWidth.column17}
                isPending={isPending}
                onActionDeal={onActionDeal}
                isAdmin={isAdmin}
            />
            <BodyCardTimeInTrade
                timeInTrade={deal?.timeInTrade}
                columnWidth={columnWidth.column18}
                isAdmin={isAdmin}
            />
        </div>
    );
}
