"use client";

import React, { useEffect, useState } from "react";

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

const initHeaders = [
    { name: "Тикер", up: false, w: "112px" },
    { name: "Win-Loss", up: true, w: "96px" },
    { name: "Поза", up: false, w: "96px" },
    { name: "Риск", up: false, w: "70px" },
    { name: "L:P", up: true, w: "80px" },
    { name: "Вход", up: true, w: "144px" },
    { name: "Скрин", up: true, w: "96px" },
    { name: "Депозит", up: true, w: "112px" },
    { name: "Прогресс", up: true, w: "112px" },
    { name: "Выход", up: true, w: "144px" },
    { name: "Скрин2", up: true, w: "96px" },
    { name: "Пора?", up: false, w: "112px" },
    { name: "Стресс", up: true, w: "96px" },
    { name: "Tags", up: false, w: "288px" },
    { name: "Заметки", up: false, w: "176px" },
    { name: "Время в сделке", up: true, w: "128px" },
    { name: "Для скрина (мин)", up: false, w: "128px" },
];

const initColumnWidth = {
    column1: "112px",
    column2: "105px",
    column3: "96px",
    column4: "70px",
    column5: "80px",
    column6: "144px",
    column7: "96px",
    column8: "112px",
    column9: "112px",
    column10: "144px",
    column11: "96px",
    column12: "112px",
    column13: "96px",
    column14: "288px",
    column15: "176px",
    column16: "128px",
    column17: "128px",
};

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
    const [columnWidth, setColumnWidth] = useState(initColumnWidth);
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

    const handleSelectDeal = ({ target }) => {
        setSelectedDeals((prev) =>
            !prev.includes(target.value)
                ? [...prev, target.value]
                : prev.filter((item) => item !== target.value)
        );
    };

    const handleResize = (column, newWidth) => {
        setColumnWidth((prevWidths) => ({
            ...prevWidths,
            [column]: newWidth,
        }));
    };

    const handleAddDeal = () => {
        setDeals((prev) => [...prev, { ...data, id: Date.now() }]);
    };

    return (
        <div className="w-max">
            <TableHead
                initHeaders={initHeaders}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onResize={handleResize}
                onChange={handleChange}
            />
            <TableBody
                deals={deals}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onChangeCheckbox={handleSelectDeal}
                onChange={handleChange}
                onAddDeal={handleAddDeal}
            />
        </div>
    );
}
