"use client";

import React, { useState } from "react";

import { determineTextColor } from "@/app/utils/determinateTextColor";
import { getRandomHexColor } from "@/app/utils/getRandomHexColor";
import { getTimeInTrade } from "@/app/utils/formatedDate";

import BodyCardName from "./common/bodyCardName";
import BodyCardEffect from "./common/bodyCardEffect";
import BodyCardPose from "./common/bodyCardPose";
import BodyCardRisk from "./common/bodyCardRisk";
import BodyCardProfit from "./common/bodyCardProfit";
import BodyCardRR from "./common/bodyCardRR";
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

            <div
                style={{ paddingLeft: columnWidth.column1 }}
                className="flex items-center"
            >
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
                    dealTimeScreenshot={deal.timeScreenshot}
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
                <BodyCardTimeScreenshot
                    dealTimeScreenshot={deal.timeScreenshot}
                    dealHover={hover}
                    columnWidth={columnWidth.column18}
                />
            </div>
        </div>
    );
}
