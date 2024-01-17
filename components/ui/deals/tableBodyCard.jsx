"use client";

import React, { useEffect, useState } from "react";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { getTimeInTrade } from "@/utils/formatedDate";

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

const timeScreenshot = 172800000; // 2 дня

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
    onChangeAllTags,
    checkAll,
    columnWidth,
    onCheckDeal,
}) {
    const [hover, setHover] = useState(false);
    const [entryDate, setEntryDate] = useState("");
    const [exitDate, setExitDate] = useState("");
    const [timeInTrade, setTimeInTrade] = useState("");
    const [takeScreenshot, setTakeScreenshot] = useState(false);

    const changeEntryDate = (date) => {
        setEntryDate(date);
    };

    const changeExitDate = (date) => {
        setExitDate(date);
    };

    useEffect(() => {
        if (entryDate && exitDate) {
            const startDate = new Date(entryDate).getTime();
            const endDate = new Date(exitDate).getTime();
            const result = endDate - startDate;
            setTakeScreenshot(result >= timeScreenshot);
            setTimeInTrade(getTimeInTrade(entryDate, exitDate));
        }
    }, [entryDate, exitDate]);

    useEffect(() => {
        if (deal) {
            setEntryDate(deal.entryDate);
            setExitDate(deal.exitDate);
        }
    }, [deal]);

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
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                index={index}
                dealName={deal.name}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                dealHover={hover}
                columnWidth={columnWidth.column1}
                onCheckDeal={onCheckDeal}
            />
            <BodyCardResult
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                resultId={deal.resultId}
                results={results}
                columnWidth={columnWidth.column2}
            />
            <BodyCardPose
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealPose={deal.pose}
                dealHover={hover}
                columnWidth={columnWidth.column3}
            />
            <BodyCardRisk
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealRisk={deal.risk}
                dealHover={hover}
                columnWidth={columnWidth.column4}
            />
            <BodyCardProfit
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealProfit={deal.profit}
                dealHover={hover}
                columnWidth={columnWidth.column5}
            />
            <BodyCardRisksRewards
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                rrId={deal.rrId}
                allRRs={allRRs}
                onChangeAllRRs={onChangeAllRRs}
                columnWidth={columnWidth.column6}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardDate
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                name="entryDate"
                dealDate={entryDate}
                onChangeDate={changeEntryDate}
                columnWidth={columnWidth.column7}
            />
            <BodyCardScreenshot
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealName={deal.name}
                inputName="imageStart"
                dealImageSrc={deal.imageStart}
                imageAlt="screenshot start"
                width={49}
                height={25}
                columnWidth={columnWidth.column8}
            />
            <BodyCardDeposit
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealDeposit={deal.deposit}
                dealHover={hover}
                columnWidth={columnWidth.column9}
            />
            <BodyCardProgress
                dealProgress={deal.progress}
                columnWidth={columnWidth.column10}
            />
            <BodyCardDate
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                name="exitDate"
                dealDate={exitDate}
                minDate={
                    entryDate && new Date(entryDate).toISOString().slice(0, 16)
                }
                maxDate={new Date().toISOString().slice(0, 16)}
                disabled={!entryDate}
                onChangeDate={changeExitDate}
                columnWidth={columnWidth.column11}
            />
            <BodyCardScreenshot
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealName={deal.name}
                inputName="imageEnd"
                dealImageSrc={deal.imageEnd}
                imageAlt="screenshot end"
                width={49}
                height={25}
                columnWidth={columnWidth.column12}
            />
            <BodyCardTakeScreenshot
                takeScreenshot={takeScreenshot}
                dealImageEndSrc={deal.imageEnd}
                columnWidth={columnWidth.column13}
            />
            <BodyCardStress
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealStress={deal.stress}
                columnWidth={columnWidth.column14}
            />
            <BodyCardTags
                userId={userId}
                dealId={deal.id}
                allTags={allTags}
                onChangeAllTags={onChangeAllTags}
                columnWidth={columnWidth.column15}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardNotes
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealNotes={deal.notes}
                columnWidth={columnWidth.column16}
            />
            <BodyCardTimeInTrade
                timeInTrade={timeInTrade}
                columnWidth={columnWidth.column17}
            />
        </div>
    );
}
