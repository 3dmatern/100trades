"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";

import BodyCardNamePublished from "@/components/dealsPublished/common/bodyCardNamePublished";
import BodyCardResultPublished from "@/components/dealsPublished/common/bodyCardResultPublished";
import BodyCardPosePublished from "@/components/dealsPublished/common/bodyCardPosePublished";
import BodyCardRiskPublished from "@/components/dealsPublished/common/bodyCardRiskPublished";
import BodyCardProfitPublished from "@/components/dealsPublished/common/bodyCardProfitPublished";
import BodyCardRisksRewardsPublished from "@/components/dealsPublished/common/bodyCardRisksRewardsPublished";
import BodyCardDatePublished from "@/components/dealsPublished/common/bodyCardDatePublished";
import BodyCardScreenshotPublished from "@/components/dealsPublished/common/bodyCardScreenshotPublished";
import BodyCardDepositPublished from "@/components/dealsPublished/common/bodyCardDepositPublished";
import BodyCardProgressPublished from "@/components/dealsPublished/common/bodyCardProgressPublished";
import BodyCardStressPublished from "@/components/dealsPublished/common/bodyCardStressPublished";
import BodyCardTagsPublished from "@/components/dealsPublished/common/bodyCardTagsPublished";
import BodyCardNotesPublished from "@/components/dealsPublished/common/bodyCardNotesPublished";
import BodyCardTakeScreenshotPublished from "@/components/dealsPublished/common/bodyCardTakeScreenshotPublished";
import BodyCardTimeInTradePublished from "@/components/dealsPublished/common/bodyCardTimeInTradePublished";
import BodyCardLongShortPublished from "./common/bodyCardLongShortPublished";

export default function TableBodyCard({
    index,
    deal,
    results,
    longShorts,
    allRRs,
    allTags,
    entrieTag,
    columnWidth,
}) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center h-8 border-b border-slate-300 relative ${
                hover ? "bg-slate-50" : "bg-white"
            }`}
        >
            {deal.name !== undefined && (
                <BodyCardNamePublished
                    index={index}
                    dealName={deal.name}
                    dealHover={hover}
                    columnWidth={columnWidth.column1}
                />
            )}
            {deal.resultId !== undefined && (
                <BodyCardResultPublished
                    dealId={deal.id}
                    resultId={deal.resultId}
                    results={results}
                    columnWidth={columnWidth.column2}
                />
            )}
            {deal.lsId !== undefined && (
                <BodyCardLongShortPublished
                    lsId={deal.lsId}
                    longShorts={longShorts}
                    columnWidth={columnWidth.column3}
                />
            )}
            {deal.pose !== undefined && (
                <BodyCardPosePublished
                    dealPose={deal.pose}
                    columnWidth={columnWidth.column4}
                />
            )}
            {deal.risk !== undefined && (
                <BodyCardRiskPublished
                    dealRisk={deal.risk}
                    columnWidth={columnWidth.column5}
                />
            )}
            {deal.profit !== undefined && (
                <BodyCardProfitPublished
                    dealProfit={deal.profit}
                    columnWidth={columnWidth.column6}
                />
            )}
            {deal.rrId !== undefined && (
                <BodyCardRisksRewardsPublished
                    rrId={deal.rrId}
                    allRRs={allRRs}
                    columnWidth={columnWidth.column7}
                    determineTextColor={determineTextColor}
                />
            )}
            {deal.entryDate !== undefined && (
                <BodyCardDatePublished
                    dealDate={deal.entryDate}
                    columnWidth={columnWidth.column8}
                />
            )}
            {deal.imageStart !== undefined && (
                <BodyCardScreenshotPublished
                    dealName={deal.name}
                    dealImageSrc={deal.imageStart}
                    imageAlt="screenshot start"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column9}
                />
            )}
            {deal.deposit !== undefined && (
                <BodyCardDepositPublished
                    dealDeposit={deal.deposit}
                    columnWidth={columnWidth.column10}
                />
            )}
            {deal.progress !== undefined && (
                <BodyCardProgressPublished
                    dealProgress={deal.progress}
                    columnWidth={columnWidth.column11}
                />
            )}
            {deal.exitDate !== undefined && (
                <BodyCardDatePublished
                    dealId={deal.id}
                    inputName="exitDate"
                    dealDate={deal.exitDate}
                    minDate={
                        deal.entryDate &&
                        dealLimitionDateWithTime(deal.entryDate)
                    }
                    maxDate={dealLimitionDateWithTime(new Date())}
                    disabled={!deal.entryDate}
                    columnWidth={columnWidth.column12}
                />
            )}
            {deal.imageEnd !== undefined && (
                <BodyCardScreenshotPublished
                    dealId={deal.id}
                    dealName={deal.name}
                    inputName="imageEnd"
                    dealImageSrc={deal.imageEnd}
                    imageAlt="screenshot end"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column13}
                />
            )}
            {deal.take !== undefined && (
                <BodyCardTakeScreenshotPublished
                    takeScreenshot={deal.take}
                    dealImageEndSrc={deal.imageEnd}
                    columnWidth={columnWidth.column14}
                />
            )}
            {deal.stress !== undefined && (
                <BodyCardStressPublished
                    dealStress={deal.stress}
                    columnWidth={columnWidth.column15}
                />
            )}
            {deal.entrieTag !== undefined && (
                <BodyCardTagsPublished
                    dealId={deal.id}
                    allTags={allTags}
                    entrieTag={entrieTag}
                    columnWidth={columnWidth.column16}
                    dealHover={hover}
                    determineTextColor={determineTextColor}
                />
            )}
            {deal.notes !== undefined && (
                <BodyCardNotesPublished
                    dealNotes={deal.notes}
                    columnWidth={columnWidth.column17}
                />
            )}
            {deal.timeInTrade !== undefined && (
                <BodyCardTimeInTradePublished
                    timeInTrade={deal.timeInTrade}
                    columnWidth={columnWidth.column18}
                />
            )}
        </div>
    );
}
