"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { getTimeInTrade } from "@/utils/formatedDate";

import BodyCardName from "@/components/ui/deals/common/bodyCardName";
import BodyCardResult from "@/components/ui/deals/common/BodyCardResult";
import BodyCardPose from "@/components/ui/deals/common/bodyCardPose";
import BodyCardRisk from "@/components/ui/deals/common/bodyCardRisk";
import BodyCardProfit from "@/components/ui/deals/common/bodyCardProfit";
import BodyCardRR from "@/components/ui/deals/common/bodyCardRR";
import BodyCardDate from "@/components/ui/deals/common/bodyCardDate";
import BodyCardScreenshot from "@/components/ui/deals/common/bodyCardScreenshot";
import BodyCardDeposit from "@/components/ui/deals/common/bodyCardDeposit";
import BodyCardProgress from "@/components/ui/deals/common/bodyCardProgress";
import BodyCardStress from "@/components/ui/deals/common/bodyCardStress";
import BodyCardTags from "@/components/ui/deals/common/bodyCardTags";
import BodyCardNotes from "@/components/ui/deals/common/bodyCardNotes";
import BodyCardInfoAction from "@/components/ui/deals/common/bodyCardInfoAction";
import BodyCardTimeInTrade from "@/components/ui/deals/common/bodyCardTimeInTrade";

const TIME_SCREENSHOT = 172800000; // 2 дня

export default function TableBodyCard({
    index,
    deal,
    selectedDeals,
    tags,
    rrs,
    checkAll,
    columnWidth,
    onChangeCheckbox,
}) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center border-b relative ${
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
                checkAll={checkAll}
                dealHover={hover}
                columnWidth={columnWidth.column1}
                onChangeCheckbox={onChangeCheckbox}
            />
            <BodyCardResult
                dealResult={deal.result}
                columnWidth={columnWidth.column2}
            />
            <BodyCardPose
                dealPose={deal.pose}
                dealHover={hover}
                columnWidth={columnWidth.column3}
            />
            <BodyCardRisk
                dealRisk={deal.risk}
                dealHover={hover}
                columnWidth={columnWidth.column4}
            />
            <BodyCardProfit
                dealProfit={deal.profit}
                dealHover={hover}
                columnWidth={columnWidth.column5}
            />
            <BodyCardRR
                rrs={rrs}
                dealRR={deal.rr}
                columnWidth={columnWidth.column6}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardDate
                dealDate={deal.entryDate}
                columnWidth={columnWidth.column7}
            />
            <BodyCardScreenshot
                dealName={deal.name}
                inputName="imageStart"
                dealImageSrc={deal.imageStart}
                imageAlt="screenshot start"
                width={49}
                height={25}
                columnWidth={columnWidth.column8}
            />
            <BodyCardDeposit
                dealDeposit={deal.deposit}
                dealHover={hover}
                columnWidth={columnWidth.column9}
            />
            <BodyCardProgress
                dealProgress={deal.progress}
                columnWidth={columnWidth.column10}
            />
            <BodyCardDate
                dealDate={deal.exitDate}
                columnWidth={columnWidth.column11}
            />
            <BodyCardScreenshot
                dealName={deal.name}
                inputName="imageEnd"
                dealImageSrc={deal.imageEnd}
                imageAlt="screenshot end"
                width={49}
                height={25}
                columnWidth={columnWidth.column12}
            />
            <BodyCardInfoAction
                dealEntryDate={deal.entryDate}
                dealExitDate={deal.exitDate}
                timeScreenshot={TIME_SCREENSHOT}
                dealImageEndSrc={deal.imageEnd}
                columnWidth={columnWidth.column13}
            />
            <BodyCardStress
                dealStress={deal.stress}
                columnWidth={columnWidth.column14}
            />
            <BodyCardTags
                dealId={deal.id}
                tags={tags}
                dealTags={deal.tags}
                columnWidth={columnWidth.column15}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardNotes
                dealNotes={deal.notes}
                columnWidth={columnWidth.column16}
            />
            <BodyCardTimeInTrade
                dealEntryDate={deal.entryDate}
                dealExitDate={deal.exitDate}
                columnWidth={columnWidth.column17}
                getTimeInTrade={getTimeInTrade}
            />
        </div>
    );
}