"use client";

import React, { useState } from "react";

import TableBody from "./tableBody";
import TableHead from "./tableHead";

const initDeals = [
    {
        id: "qwerty",
        name: "NMTP",
        effect: "win",
        pose: "25,000.00",
        risk: "0.50",
        lp: { label: "1:2", value: "blue" },
        entry: new Date().setDate(3),
        screenStart: "nmtp.png",
        deposit: "",
        progress: "0.00",
        exit: "",
        screenEnd: "",
        stress: "",
        tags: [],
        notes: "по тех анализу про версии",
        timeInTrade: "",
        timeForScreenEnd: "",
    },
    {
        id: "qwefgh",
        name: "AFLT",
        effect: "active",
        pose: "50,000.00",
        risk: "0.90",
        lp: { label: "1:2", value: "blue" },
        entry: new Date().setDate(4),
        screenStart: "aflt.png",
        deposit: "",
        progress: "0.00",
        exit: "",
        screenEnd: "",
        stress: "",
        tags: [{ label: "фиксировал часть", value: "blue" }],
        notes: "",
        timeInTrade: "",
        timeForScreenEnd: "",
    },
    {
        id: "qwevbn",
        name: "AFKS",
        effect: "loss",
        pose: "50,000.00",
        risk: "1.10",
        lp: { label: "1:7", value: "green" },
        entry: new Date().setDate(3),
        screenStart: "afks.png",
        deposit: "",
        progress: "0.00",
        exit: new Date().setDate(4),
        screenEnd: "",
        stress: "2",
        tags: [{ label: "человеческий фактор", value: "pink" }],
        notes: "",
        timeInTrade: "",
        timeForScreenEnd: "",
    },
    {
        id: "qwerfv",
        name: "MOEX",
        effect: "noLoss",
        pose: "5,000.00",
        risk: "",
        lp: { label: "1:10", value: "lime" },
        entry: new Date().setDate(3),
        screenStart: "moex.png",
        deposit: "",
        progress: "0.00",
        exit: "",
        screenEnd: "",
        stress: "3",
        tags: [
            { label: "двигал стоп", value: "gray" },
            { label: "усреднял", value: "green" },
        ],
        notes: "",
        timeInTrade: "",
        timeForScreenEnd: "",
    },
];

const initData = {
    name: "",
    effect: "",
    pose: "",
    risk: "",
    lp: { label: "", value: "" },
    entry: "",
    screenStart: "",
    deposit: "",
    progress: "",
    exit: "",
    screenEnd: "",
    stress: "",
    tags: [],
    notes: "",
    timeInTrade: "",
    timeForScreenEnd: "",
};

export default function Table() {
    const [data, setData] = useState(initData);
    const [checkAll, setCheckAll] = useState(false);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleChange = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => !prev);
        }
        console.log(target);
    };

    const handleSelectDeal = ({ target }) => {
        console.log(target);
        setSelectedDeals((prev) =>
            !prev.includes(target.value)
                ? [...prev, target.value]
                : prev.filter((item) => item !== target.value)
        );
    };

    return (
        <>
            <TableHead checkAll={checkAll} onChange={handleChange} />
            <TableBody
                deals={initDeals}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                onChangeCheckbox={handleSelectDeal}
                onChange={handleChange}
            />
        </>
    );
}
