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
import { createTag } from "@/actions/tag";
import {
    createEntrieTag,
    getEntrieTags,
    removeEntrieTag,
} from "@/actions/entrieTag";
import { toast } from "sonner";

const TIME_SCREENSHOT = 172800000; // 2 дня

const initData = {
    name: "",
    result: "",
    pose: "",
    risk: "",
    profit: "",
    rr: null,
    entryDate: "",
    imageStart: "",
    deposit: "",
    progress: "",
    exitDate: "",
    imageEnd: null,
    stress: "",
    tags: [],
    notes: "",
};

export default function TableBodyCard({
    userId,
    sheetId,
    index,
    deal,
    selectedDeals,
    results,
    risksRewards,
    tags,
    checkAll,
    columnWidth,
    onCheckDeal,
}) {
    const [hover, setHover] = useState(false);
    const [tag, setTag] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const [entrieTags, setEntrieTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);

    const handleRemoveItem = async (tagId) => {
        setCurrentTags((prev) => prev.filter((tag) => tag.id !== tagId));
        await removeEntrieTag({
            userId,
            entrieTag: { entrieId: deal.id, tagId },
        }).then((data) => {
            if (data.error) {
                toast.error(data.error);
            }
            if (data.success) {
                toast.success(data.success);
            }
        });
    };

    const handleItemSearch = ({ target }) => {
        if (target.name === "tag") {
            setTag(target.value);
            setFilteredTags(
                tags.filter((tag) => tag.label.includes(target.value))
            );
        }
    };

    const handleClickSelectedTag = async (tag) => {
        let selectTag = tag;
        if (!selectTag.id) {
            const { newTag, success, error } = await createTag({
                userId,
                values: tag,
            });
            if (error) {
                toast.error(error);
                return;
            } else {
                toast.success(success);
                selectTag = newTag;
            }
        }
        setCurrentTags((prev) => [...prev, selectTag]);
        const { newEntrieTag, success, error } = await createEntrieTag({
            userId,
            values: { entrieId: deal.id, tagId: selectTag.id },
        });
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
        }
    };

    useEffect(() => {
        if (tags) {
            setFilteredTags(tags);
        }
    }, [tags]);

    useEffect(() => {
        const getData = async () => {
            const entrieTagsData = await getEntrieTags(deal.id);
            if (entrieTagsData.error) {
                toast.error(entrieTagsData.error);
                return;
            } else {
                setEntrieTags(entrieTagsData.entrieTags);
            }
        };
        getData();
    }, [deal.id]);

    useEffect(() => {
        if (tags) {
            setCurrentTags(
                tags.filter((tag) =>
                    entrieTags.some((et) => tag.id === et.tagId)
                )
            );
        }
    }, [entrieTags, tags]);

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
            <BodyCardRR
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                rrId={deal.rrId}
                risksRewards={risksRewards}
                columnWidth={columnWidth.column6}
                determineTextColor={determineTextColor}
                getRandomHexColor={getRandomHexColor}
            />
            <BodyCardDate
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealDate={deal.entryDate}
                name="entryDate"
                columnWidth={columnWidth.column7}
            />
            <BodyCardScreenshot
                userId={userId}
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
                dealDate={deal.exitDate}
                name="exitDate"
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
                userId={userId}
                sheetId={sheetId}
                dealId={deal.id}
                dealStress={deal.stress}
                columnWidth={columnWidth.column14}
            />
            <BodyCardTags
                tag={tag}
                filteredTags={filteredTags}
                currentTags={currentTags}
                onItemSearch={handleItemSearch}
                onClickSelectTag={handleClickSelectedTag}
                onRemoveItem={handleRemoveItem}
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
                dealEntryDate={deal.entryDate}
                dealExitDate={deal.exitDate}
                columnWidth={columnWidth.column17}
                getTimeInTrade={getTimeInTrade}
            />
        </div>
    );
}
