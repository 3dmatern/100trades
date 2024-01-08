"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/app/utils/determinateTextColor";
import { getRandomHexColor } from "@/app/utils/getRandomHexColor";
import { getTimeInTrade } from "@/app/utils/formatedDate";

import BodyCardName from "./common/bodyCardName";
import BodyCardEffect from "./common/bodyCardEffect";
import BodyCardPose from "./common/bodyCardPose";
import BodyCardRisk from "./common/bodyCardRisk";
import BodyCardLP from "./common/bodyCardLP";
import BodyCardDate from "./common/bodyCardDate";
import BodyCardScreenshot from "./common/bodyCardScreenshot";
import BodyCardDeposit from "./common/bodyCardDeposit";
import BodyCardProgress from "./common/bodyCardProgress";
import BodyCardTimeScreenshot from "./common/bodyCardTimeScreenshot";
import BodyCardStress from "./common/bodyCardStress";
import BodyCardTags from "./common/bodyCardTags";
import BodyCardNotes from "./common/bodyCardNotes";
import BodyCardInfoAction from "./common/bodyCardInfoAction";
import BodyCardTimeInTrade from "./common/bodyCardTimeInTrade";

export default function TableBodyCard({
    index,
    deal,
    selectedDeals,
    tags,
    lps,
    checkAll,
    columnWidth,
    onChangeCheckbox,
}) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center ${
                selectedDeals?.includes(deal.id) || hover
                    ? "bg-slate-50"
                    : "bg-white"
            } border-b`}
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

            <div className="flex items-center pl-28">
                <BodyCardEffect
                    dealEffect={deal.effect}
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
                <BodyCardLP
                    lps={lps}
                    dealLP={deal.lp}
                    columnWidth={columnWidth.column5}
                    determineTextColor={determineTextColor}
                    getRandomHexColor={getRandomHexColor}
                />
                <BodyCardDate
                    dealDate={deal.entryDate}
                    columnWidth={columnWidth.column6}
                />
                <BodyCardScreenshot
                    inputName="imageStart"
                    dealImageSrc={deal.imageStart}
                    imageAlt="screenshot start"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column7}
                />
                <BodyCardDeposit
                    dealDeposit={deal.deposit}
                    dealHover={hover}
                    columnWidth={columnWidth.column8}
                />
                <BodyCardProgress
                    dealProgress={deal.progress}
                    columnWidth={columnWidth.column9}
                />
                <BodyCardDate
                    dealDate={deal.exitDate}
                    columnWidth={columnWidth.column10}
                />
                <BodyCardScreenshot
                    inputName="imageEnd"
                    dealImageSrc={deal.imageEnd}
                    imageAlt="screenshot end"
                    width={49}
                    height={25}
                    columnWidth={columnWidth.column11}
                />
                <BodyCardInfoAction
                    dealEntryDate={deal.entryDate}
                    dealExitDate={deal.exitDate}
                    dealTimeScreenshot={deal.timeScreenshot}
                    dealImageEndSrc={deal.imageEnd}
                    columnWidth={columnWidth.column12}
                />
                <BodyCardStress
                    dealStress={deal.stress}
                    columnWidth={columnWidth.column13}
                />
                <BodyCardTags
                    dealId={deal.id}
                    tags={tags}
                    dealTags={deal.tags}
                    columnWidth={columnWidth.column14}
                    determineTextColor={determineTextColor}
                    getRandomHexColor={getRandomHexColor}
                />
                <BodyCardNotes
                    dealNotes={deal.notes}
                    columnWidth={columnWidth.column15}
                />
                <BodyCardTimeInTrade
                    dealEntryDate={deal.entryDate}
                    dealExitDate={deal.exitDate}
                    columnWidth={columnWidth.column16}
                    getTimeInTrade={getTimeInTrade}
                />
                <BodyCardTimeScreenshot
                    dealTimeScreenshot={deal.timeScreenshot}
                    dealHover={hover}
                    columnWidth={columnWidth.column17}
                />
            </div>
        </div>
    );
}
