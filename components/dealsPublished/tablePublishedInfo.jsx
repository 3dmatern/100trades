"use client";

import { useEffect, useState } from "react";

import Cell from "@/components/dealsPublished/common/cell";

export default function TablePublishedInfo({ columnWidth, deals, results }) {
    const [quantityWin, setQuantityWin] = useState(0);
    const [quantityLoss, setQuantityLoss] = useState(0);
    const [quantityNoLoss, setQuantityNoLoss] = useState(0);
    const [quantityActive, setQuantityActive] = useState(0);
    const [portfolioRisk, setPortfolioRisk] = useState(0);

    useEffect(() => {
        if (deals && results && deals.length > 0) {
            let win = 0;
            let loss = 0;
            let noLoss = 0;
            let active = 0;
            let riskSum = 0;

            deals.forEach((d) => {
                results.forEach((r) => {
                    if (r.id === d.resultId) {
                        switch (r.type) {
                            case 1:
                                win++;
                                break;
                            case 2:
                                loss++;
                                break;
                            case 3:
                                noLoss++;
                                break;
                            case 4:
                                active++;
                                riskSum = riskSum + +d.pose * +d.risk;
                                break;
                            default:
                                break;
                        }
                    }
                });
            });

            setQuantityWin(win);
            setQuantityLoss(loss);
            setQuantityNoLoss(noLoss);
            setQuantityActive(active);
            setPortfolioRisk(riskSum);
        }
    }, [deals, results]);

    return (
        deals?.length > 0 && (
            <div className="flex items-center justify-center h-8 sticky left-0 top-0 z-[4] bg-gray-200">
                {deals[0]?.name !== undefined && (
                    <Cell columnWidth={columnWidth.column1}></Cell>
                )}
                {deals[0]?.resultId !== undefined && (
                    <Cell columnWidth={columnWidth.column2}>
                        <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                            W: {quantityWin}
                        </span>
                        <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                            L: {quantityLoss}
                        </span>
                        <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                            БУ: {quantityNoLoss}
                        </span>
                        <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                            A: {quantityActive}
                        </span>
                    </Cell>
                )}
                {deals[0]?.pose !== undefined && (
                    <Cell columnWidth={columnWidth.column3}></Cell>
                )}
                {deals[0]?.risk !== undefined && (
                    <Cell columnWidth={columnWidth.column4}>
                        <span
                            className={portfolioRisk > 0 ? "text-red-600" : ""}
                        >
                            {portfolioRisk} ₽
                        </span>
                    </Cell>
                )}
                {deals[0]?.profit !== undefined && (
                    <Cell columnWidth={columnWidth.column5}></Cell>
                )}
                {deals[0]?.rrId !== undefined && (
                    <Cell columnWidth={columnWidth.column6}></Cell>
                )}
                {deals[0]?.entryDate !== undefined && (
                    <Cell columnWidth={columnWidth.column7}></Cell>
                )}
                {deals[0]?.imageStart !== undefined && (
                    <Cell columnWidth={columnWidth.column8}></Cell>
                )}
                {deals[0]?.deposit !== undefined && (
                    <Cell columnWidth={columnWidth.column9}></Cell>
                )}
                {deals[0]?.progress !== undefined && (
                    <Cell columnWidth={columnWidth.column10}></Cell>
                )}
                {deals[0]?.exitDate !== undefined && (
                    <Cell columnWidth={columnWidth.column11}></Cell>
                )}
                {deals[0]?.imageEnd !== undefined && (
                    <Cell columnWidth={columnWidth.column12}></Cell>
                )}
                {deals[0]?.take !== undefined && (
                    <Cell columnWidth={columnWidth.column13}></Cell>
                )}
                {deals[0]?.stress !== undefined && (
                    <Cell columnWidth={columnWidth.column14}></Cell>
                )}
                {deals[0]?.entrieTag !== undefined && (
                    <Cell columnWidth={columnWidth.column15}></Cell>
                )}
                {deals[0]?.notes !== undefined && (
                    <Cell columnWidth={columnWidth.column16}></Cell>
                )}
                {deals[0]?.timeInTrade !== undefined && (
                    <Cell columnWidth={columnWidth.column17}></Cell>
                )}
            </div>
        )
    );
}
