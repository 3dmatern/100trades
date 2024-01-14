"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { createEntrie, getEntries } from "@/actions/entrie";

import TableBody from "@/components/ui/deals/tableBody";
import TableHead from "@/components/ui/deals/tableHead";

const initDeals = [
    {
        id: "qwerty",
        name: "NMTP",
        result: "win",
        pose: "25000",
        risk: "0.50",
        profit: "",
        rr: { label: "1:2", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "nmtp.png",
        deposit: "",
        progress: "0.00",
        exitDate: "",
        imageEnd: null,
        stress: "",
        tags: [],
        notes: "по тех анализу про версии",
    },
    {
        id: "qwefgh",
        name: "AFLT",
        result: "active",
        pose: "50000",
        risk: "0.90",
        profit: "0.50",
        rr: { label: "1:2", value: getRandomHexColor() },
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
    },
    {
        id: "qwevbn",
        name: "AFKS",
        result: "loss",
        pose: "50000",
        risk: "1.10",
        profit: "1.90",
        rr: { label: "1:7", value: getRandomHexColor() },
        entryDate: new Date().setDate(3),
        imageStart: "afks.png",
        deposit: "",
        progress: "0.00",
        exitDate: new Date().setDate(6),
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
    },
    {
        id: "qwerfv",
        name: "MOEX",
        result: "noLoss",
        pose: "5000",
        risk: "",
        profit: "1.10",
        rr: null,
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
    },
];

const initHeaders = [
    { name: "Тикер", up: false, w: "112px" },
    { name: "Win-Loss", up: true, w: "96px" },
    { name: "Поза", up: false, w: "96px" },
    { name: "Риск", up: false, w: "70px" },
    { name: "Профит", up: false, w: "75px" },
    { name: "R:R", up: true, w: "80px" },
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
];

const initColumnWidth = {
    column1: "112px",
    column2: "105px",
    column3: "96px",
    column4: "70px",
    column5: "75px",
    column6: "80px",
    column7: "144px",
    column8: "96px",
    column9: "112px",
    column10: "112px",
    column11: "144px",
    column12: "96px",
    column13: "112px",
    column14: "96px",
    column15: "288px",
    column16: "176px",
    column17: "128px",
};

export default function Table({ userId, sheetId }) {
    const [deals, setDeals] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [columnWidth, setColumnWidth] = useState(initColumnWidth);
    const [selectedDeals, setSelectedDeals] = useState([]);

    const handleCheckAll = ({ target }) => {
        if (target.name === "checkAll") {
            setCheckAll((prev) => {
                !prev
                    ? setSelectedDeals(deals.map((deal) => deal.id))
                    : setSelectedDeals([]);
                return !prev;
            });
        }
    };

    const handleCheckDeal = ({ target }) => {
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

    const handleCreateDeal = async () => {
        await createEntrie({ userId, sheetId }).then((data) => {
            if (data.error) {
                toast.error(data.error);
            }
            if (data.success) {
                setDeals((prev) => [...prev, data.newEntrie]);
                toast.success(data.success);
            }
        });
    };

    useEffect(() => {
        if (sheetId) {
            const entries = async () => {
                const result = await getEntries(sheetId).then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    return data;
                });
                setDeals(result);
            };
            entries();
        }
    }, [sheetId]);

    return (
        <div className="w-max">
            <TableHead
                initHeaders={initHeaders}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onResize={handleResize}
                onCheckAll={handleCheckAll}
            />
            <TableBody
                userId={userId}
                sheetId={sheetId}
                deals={deals}
                selectedDeals={selectedDeals}
                checkAll={checkAll}
                columnWidth={columnWidth}
                onCheckDeal={handleCheckDeal}
                onCreateDeal={handleCreateDeal}
            />
        </div>
    );
}
