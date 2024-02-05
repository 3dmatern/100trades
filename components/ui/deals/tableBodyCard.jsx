"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";

import BodyCardName from "@/components/ui/deals/common/bodyCardName";
import BodyCardResult from "@/components/ui/deals/common/BodyCardResult";
import BodyCardPose from "@/components/ui/deals/common/bodyCardPose";
import BodyCardRisk from "@/components/ui/deals/common/bodyCardRisk";
import BodyCardProfit from "@/components/ui/deals/common/bodyCardProfit";
import BodyCardRisksRewards from "@/components/ui/deals/common/bodyCardRisksRewards";
import BodyCardDate from "@/components/ui/deals/common/bodyCardDate";
import BodyCardScreenshot from "@/components/ui/deals/common/bodyCardScreenshot";
import BodyCardDeposit from "@/components/ui/deals/common/bodyCardDeposit";
import BodyCardProgress from "@/components/ui/deals/common/bodyCardProgress";
import BodyCardStress from "@/components/ui/deals/common/bodyCardStress";
import BodyCardTags from "@/components/ui/deals/common/bodyCardTags";
import BodyCardNotes from "@/components/ui/deals/common/bodyCardNotes";
import BodyCardTakeScreenshot from "@/components/ui/deals/common/bodyCardTakeScreenshot";
import BodyCardTimeInTrade from "@/components/ui/deals/common/bodyCardTimeInTrade";

export default function TableBodyCard({
    userId,
    sheetId,
    index,
    deal,
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
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center h-8 border-b border-slate-300 relative ${
                selectedDeals?.includes(deal.id) || hover
                    ? "bg-slate-50"
                    : "bg-white"
            }`}
        >
            <BodyCardName
                index={index}
                dealId={deal.id}
                dealName={deal.name}
                selectedDeals={selectedDeals}
                dealHover={hover}
                columnWidth={columnWidth.column1}
                onCheckDeal={onCheckDeal}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardResult
                dealId={deal.id}
                resultId={deal.resultId}
                results={results}
                columnWidth={columnWidth.column2}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardPose
                dealId={deal.id}
                dealPose={deal.pose}
                dealHover={hover}
                columnWidth={columnWidth.column3}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardRisk
                dealId={deal.id}
                dealRisk={deal.risk}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column4}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardProfit
                dealId={deal.id}
                dealProfit={deal.profit}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column5}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardRisksRewards
                userId={userId}
                dealId={deal.id}
                rrId={deal.rrId}
                allRRs={allRRs}
                onChangeAllRRs={onChangeAllRRs}
                columnWidth={columnWidth.column6}
                determineTextColor={determineTextColor}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardDate
                dealId={deal.id}
                inputName="entryDate"
                dealDate={deal.entryDate}
                maxDate={dealLimitionDateWithTime(new Date())}
                columnWidth={columnWidth.column7}
                isPending={isPending}
                disabled={deal.exitDate}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardScreenshot
                dealId={deal.id}
                dealName={deal.name}
                inputName="imageStart"
                dealImageSrc={deal.imageStart}
                imageAlt="screenshot start"
                width={49}
                height={25}
                columnWidth={columnWidth.column8}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardDeposit
                dealId={deal.id}
                dealDeposit={deal.deposit}
                dealHover={hover}
                columnWidth={columnWidth.column9}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardProgress
                dealProgress={deal.progress}
                columnWidth={columnWidth.column10}
            />
            <BodyCardDate
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                inputName="exitDate"
                dealDate={deal.exitDate}
                minDate={
                    deal.entryDate && dealLimitionDateWithTime(deal.entryDate)
                }
                maxDate={dealLimitionDateWithTime(new Date())}
                disabled={!deal.entryDate}
                columnWidth={columnWidth.column11}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardScreenshot
                dealId={deal.id}
                dealName={deal.name}
                inputName="imageEnd"
                dealImageSrc={deal.imageEnd}
                imageAlt="screenshot end"
                width={49}
                height={25}
                columnWidth={columnWidth.column12}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardTakeScreenshot
                takeScreenshot={deal.take}
                dealImageEndSrc={deal.imageEnd}
                columnWidth={columnWidth.column13}
            />
            <BodyCardStress
                dealId={deal.id}
                dealStress={deal.stress}
                columnWidth={columnWidth.column14}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardTags
                userId={userId}
                dealId={deal.id}
                allTags={allTags}
                onUpdateAllTags={onUpdateAllTags}
                columnWidth={columnWidth.column15}
                dealHover={hover}
                selectedDeals={selectedDeals}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardNotes
                dealId={deal.id}
                dealNotes={deal.notes}
                columnWidth={columnWidth.column16}
                isPending={isPending}
                onUpdateDeal={onUpdateDeal}
            />
            <BodyCardTimeInTrade
                timeInTrade={deal.timeInTrade}
                columnWidth={columnWidth.column17}
            />
        </div>
    );
}
