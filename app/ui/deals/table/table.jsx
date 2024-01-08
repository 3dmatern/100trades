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
        pose: "25000",
        risk: "0.50",
        lp: { label: "1:2", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "nmtp.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: null,
        stress: "",
        tags: [],
        notes: "по тех анализу про версии",
        timeScreenshot: "",
    },
    {
        id: "qwefgh",
        name: "AFLT",
        effect: "active",
        pose: "50000",
        risk: "0.90",
        lp: { label: "1:2", value: getRandomHexColor() },
        entryDate: new Date().setDate(4),
        imageStart: "aflt.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: null,
        stress: "",
        tags: [
            {
                id: "tag1",
                label: "фиксировал часть",
                value: getRandomHexColor(),
            },
        ],
        notes: "",
        timeScreenshot: "",
    },
    {
        id: "qwevbn",
        name: "AFKS",
        effect: "loss",
        pose: "50000",
        risk: "1.10",
        lp: { label: "1:7", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "afks.png",
        deposit: "",
        progress: "0.00",
        exitDate: new Date().setDate(4),
        imageEnd: null,
        stress: "2",
        tags: [
            {
                id: "tag2",
                label: "человеческий фактор",
                value: getRandomHexColor(),
            },
        ],
        notes: "",
        timeScreenshot: "",
    },
    {
        id: "qwerfv",
        name: "MOEX",
        effect: "noLoss",
        pose: "5000",
        risk: "",
        lp: { label: "1:10", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "moex.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: null,
        stress: "3",
        tags: [
            { id: "tag3", label: "двигал стоп", value: getRandomHexColor() },
            { id: "tag4", label: "усреднял", value: getRandomHexColor() },
        ],
        notes: "",
        timeScreenshot: "",
    },
];

const initData = {
    name: "",
    effect: "",
    pose: "",
    risk: "",
    lp: null,
    entryDate: "",
    imageStart: "",
    deposit: "",
    progress: "",
    exitDate: "",
    imageEnd: null,
    stress: "",
    tags: [],
    notes: "",
    timeScreenshot: "",
};

export default function Table() {
    const [data, setData] = useState(initData);
    const [deals, setDeals] = useState(initDeals);
    const [checkAll, setCheckAll] = useState(false);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleChange = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => {
                !prev
                    ? setSelectedDeals(deals.map((deal) => deal.id))
                    : setSelectedDeals([]);
                return !prev;
            });
        }
    };

    const handleAddDeal = () => {
        setDeals((prev) => [...prev, { ...data, id: Date.now() }]);
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
                deals={deals}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                onChangeCheckbox={handleSelectDeal}
                onChange={handleChange}
                onAddDeal={handleAddDeal}
            />
        </div>
    );
}
