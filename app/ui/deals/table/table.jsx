"use client";

import React, { useState } from "react";

import { getRandomHexColor } from "@/app/utils/getRandomHexColor";

import TableBody from "./tableBody";
import TableHead from "./tableHead";

const initDeals = [
    {
        id: "qwerty",
        name: "NMTP",
        effect: "win",
        pose: "25,000.00",
        risk: "0.50",
        lp: { label: "1:2", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "nmtp.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: "",
        stress: "",
        tags: [],
        notes: "по тех анализу про версии",
        timeInTrade: "",
        timeScreenshot: "",
    },
    {
        id: "qwefgh",
        name: "AFLT",
        effect: "active",
        pose: "50,000.00",
        risk: "0.90",
        lp: { label: "1:2", value: getRandomHexColor() },
        entryDate: new Date().setDate(4),
        imageStart: "aflt.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: "",
        stress: "",
        tags: [{ label: "фиксировал часть", value: getRandomHexColor() }],
        notes: "",
        timeInTrade: "",
        timeScreenshot: "",
    },
    {
        id: "qwevbn",
        name: "AFKS",
        effect: "loss",
        pose: "50,000.00",
        risk: "1.10",
        lp: { label: "1:7", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "afks.png",
        deposit: "",
        progress: "0.00",
        exitDate: new Date().setDate(4),
        imageEnd: "",
        stress: "2",
        tags: [{ label: "человеческий фактор", value: getRandomHexColor() }],
        notes: "",
        timeInTrade: "",
        timeScreenshot: "",
    },
    {
        id: "qwerfv",
        name: "MOEX",
        effect: "noLoss",
        pose: "5,000.00",
        risk: "",
        lp: { label: "1:10", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "moex.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: "",
        stress: "3",
        tags: [
            { label: "двигал стоп", value: getRandomHexColor() },
            { label: "усреднял", value: getRandomHexColor() },
        ],
        notes: "",
        timeInTrade: "",
        timeScreenshot: "",
    },
];

const initData = {
    name: "",
    effect: "",
    pose: "",
    risk: "",
    lp: { label: "", value: "" },
    entryDate: "",
    imageStart: "",
    deposit: "",
    progress: "",
    exitDate: "",
    imageEnd: "",
    stress: "",
    tags: [],
    notes: "",
    timeInTrade: "",
    timeScreenshot: "",
};

export default function Table() {
    const [data, setData] = useState(initData);
    const [checkAll, setCheckAll] = useState(false);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleChange = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => {
                !prev
                    ? setSelectedDeals(initDeals.map((deal) => deal.id))
                    : setSelectedDeals([]);
                return !prev;
            });
        }
    };

    const handleSelectDeal = ({ target }) => {
        setSelectedDeals((prev) =>
            !prev.includes(target.value)
                ? [...prev, target.value]
                : prev.filter((item) => item !== target.value)
        );
    };

    return (
        <div className="w-max">
            <TableHead checkAll={checkAll} onChange={handleChange} />
            <TableBody
                deals={initDeals}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                onChangeCheckbox={handleSelectDeal}
                onChange={handleChange}
            />
        </div>
    );
}
