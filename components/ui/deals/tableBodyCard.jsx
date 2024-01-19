"use client";

import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { determineTextColor } from "@/utils/determinateTextColor";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { dealLimitionDateWithTime, getTimeInTrade } from "@/utils/formatedDate";

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
import { updateEntrie } from "@/actions/entrie";

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
    onChangeDeal,
}) {
    const [isPending, startTransition] = useTransition();
    const [hover, setHover] = useState(false);
    const [entryDate, setEntryDate] = useState("");
    const [exitDate, setExitDate] = useState("");

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
            const isScreenshot = result >= timeScreenshot;
            const time = getTimeInTrade(entryDate, exitDate);

            if (isScreenshot) {
                startTransition(() => {
                    updateEntrie({ userId, sheetId, take: "Сделай скрин" })
                        .then((data) => {
                            if (data.error) {
                                toast.error(data.error);
                            }
                            if (data.success) {
                                setOpen(false);
                                toast.success(data.success);
                                onChangeDeal({
                                    id: deal.id,
                                    name: "take",
                                    value: "Сделай скрин",
                                });
                            }
                        })
                        .catch(() => {
                            toast.error("Что-то пошло не так!");
                        });
                });
            } else {
                startTransition(() => {
                    updateEntrie({ userId, sheetId, take: "Рано" })
                        .then((data) => {
                            if (data.error) {
                                toast.error(data.error);
                            }
                            if (data.success) {
                                setOpen(false);
                                toast.success(data.success);
                                onChangeDeal({
                                    id: deal.id,
                                    name: "take",
                                    value: "Рано",
                                });
                            }
                        })
                        .catch(() => {
                            toast.error("Что-то пошло не так!");
                        });
                });
            }

            if (time) {
                startTransition(() => {
                    updateEntrie({ userId, sheetId, timeInTrade: time })
                        .then((data) => {
                            if (data.error) {
                                toast.error(data.error);
                            }
                            if (data.success) {
                                setOpen(false);
                                toast.success(data.success);
                                onChangeDeal({
                                    id: deal.id,
                                    name: "timeInTrade",
                                    value: time,
                                });
                            }
                        })
                        .catch(() => {
                            toast.error("Что-то пошло не так!");
                        });
                });
            } else {
                startTransition(() => {
                    updateEntrie({ userId, sheetId, timeInTrade: "" })
                        .then((data) => {
                            if (data.error) {
                                toast.error(data.error);
                            }
                            if (data.success) {
                                setOpen(false);
                                toast.success(data.success);
                                onChangeDeal({
                                    id: deal.id,
                                    name: "timeInTrade",
                                    value: "",
                                });
                            }
                        })
                        .catch(() => {
                            toast.error("Что-то пошло не так!");
                        });
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                onChangeDeal={onChangeDeal}
            />
            <BodyCardResult
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                resultId={deal.resultId}
                results={results}
                columnWidth={columnWidth.column2}
                onChangeDeal={onChangeDeal}
            />
            <BodyCardPose
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealPose={deal.pose}
                dealHover={hover}
                columnWidth={columnWidth.column3}
                onChangeDeal={onChangeDeal}
            />
            <BodyCardRisk
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealRisk={deal.risk}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column4}
                onChangeDeal={onChangeDeal}
            />
            <BodyCardProfit
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealProfit={deal.profit}
                dealHover={hover}
                selectedDeals={selectedDeals}
                columnWidth={columnWidth.column5}
                onChangeDeal={onChangeDeal}
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
                onChangeDeal={onChangeDeal}
            />
            <BodyCardDate
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                name="entryDate"
                dealDate={entryDate}
                onChangeDate={changeEntryDate}
                columnWidth={columnWidth.column7}
                onChangeDeal={onChangeDeal}
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
                onChangeDeal={onChangeDeal}
            />
            <BodyCardDeposit
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealDeposit={deal.deposit}
                dealHover={hover}
                columnWidth={columnWidth.column9}
                onChangeDeal={onChangeDeal}
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
                minDate={entryDate && dealLimitionDateWithTime(entryDate)}
                maxDate={dealLimitionDateWithTime(new Date())}
                disabled={!entryDate}
                onChangeDate={changeExitDate}
                columnWidth={columnWidth.column11}
                onChangeDeal={onChangeDeal}
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
                onChangeDeal={onChangeDeal}
            />
            <BodyCardTakeScreenshot
                takeScreenshot={deal.take}
                dealImageEndSrc={deal.imageEnd}
                columnWidth={columnWidth.column13}
            />
            <BodyCardStress
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealStress={deal.stress}
                columnWidth={columnWidth.column14}
                onChangeDeal={onChangeDeal}
            />
            <BodyCardTags
                userId={userId}
                dealId={deal.id}
                allTags={allTags}
                onChangeAllTags={onChangeAllTags}
                columnWidth={columnWidth.column15}
                dealHover={hover}
                selectedDeals={selectedDeals}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardNotes
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealNotes={deal.notes}
                columnWidth={columnWidth.column16}
                onChangeDeal={onChangeDeal}
            />
            <BodyCardTimeInTrade
                timeInTrade={deal.timeInTrade}
                columnWidth={columnWidth.column17}
            />
        </div>
    );
}
