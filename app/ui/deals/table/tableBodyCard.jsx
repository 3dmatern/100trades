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
                onChangeCheckbox={onChangeCheckbox}
            />

            <div className="flex items-center pl-28">
                <BodyCardEffect dealEffect={deal.effect} />
                <BodyCardPose dealPose={deal.pose} dealHover={hover} />
                <BodyCardRisk dealRisk={deal.risk} dealHover={hover} />
                <BodyCardLP
                    lps={lps}
                    dealLP={deal.lp}
                    determineTextColor={determineTextColor}
                    getRandomHexColor={getRandomHexColor}
                />
                <BodyCardDate dealDate={deal.entryDate} />
                <BodyCardScreenshot
                    dealImageSrc={deal.imageStart}
                    imageAlt="screenshot start"
                    width={49}
                    height={25}
                />
                <BodyCardDeposit dealDeposit={deal.deposit} dealHover={hover} />
                <BodyCardProgress dealProgress={deal.progress} />
                <BodyCardDate dealDate={deal.exitDate} />
                <BodyCardScreenshot
                    dealImageSrc={deal.imageEnd}
                    imageAlt="screenshot end"
                    width={49}
                    height={25}
                />
                <BodyCardInfoAction
                    dealEntryDate={deal.entryDate}
                    dealExitDate={deal.exitDate}
                    dealTimeScreenshot={deal.timeScreenshot}
                    dealImageEndSrc={deal.imageEnd}
                />
                <BodyCardStress dealStress={deal.stress} dealHover={hover} />
                <BodyCardTags
                    dealId={deal.id}
                    tags={tags}
                    dealTags={deal.tags}
                    determineTextColor={determineTextColor}
                    getRandomHexColor={getRandomHexColor}
                />
                <BodyCardNotes dealNotes={deal.notes} />
                <BodyCardTimeInTrade
                    dealEntryDate={deal.entryDate}
                    dealExitDate={deal.exitDate}
                    getTimeInTrade={getTimeInTrade}
                />
                <BodyCardTimeScreenshot
                    dealTimeScreenshot={deal.timeScreenshot}
                    dealHover={hover}
                />
            </div>
        </div>
    );
}
