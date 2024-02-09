"use client";

import { useEffect, useState } from "react";

import Cell from "@/components/dealsPublished/common/cell";
import { formatPrice } from "@/utils/formattedNumber";

export default function TablePublishedInfo({ columnWidth, deals, results }) {
    const [percentWin, setPercentWin] = useState(0);
    const [percentLoss, setPercentLoss] = useState(0);
    const [portfolioRisk, setPortfolioRisk] = useState(0);

    useEffect(() => {
        if (deals && results && deals.length > 0) {
            let quantityWin = 0;
            let quantityLoss = 0;
            let riskSum = 0;

            deals.forEach((d) => {
                results.forEach((r) => {
                    if (r.id === d.resultId) {
                        switch (r.type) {
                            case 1:
                                quantityWin++;
                                break;
                            case 2:
                                quantityLoss++;
                                break;
                            case 4:
                                riskSum = riskSum + (+d.pose / 100) * +d.risk;
                                break;
                            default:
                                break;
                        }
                    }
                });
            });

            const total = quantityWin + quantityLoss;
            if (quantityWin > 0) {
                const resultPercentWin = Math.floor(
                    (quantityWin / total) * 100
                );
                setPercentWin(resultPercentWin);
            } else {
                setPercentWin(0);
            }
            if (quantityLoss > 0) {
                const resultPercentLoss = Math.ceil(
                    (quantityLoss / total) * 100
                );
                setPercentLoss(resultPercentLoss);
            } else {
                setPercentLoss(0);
            }

            setPortfolioRisk(riskSum);
        } else {
            setPercentWin(0);
            setPercentLoss(0);
            setPortfolioRisk(0);
        }
    }, [deals, results]);

    return (
        <div className="flex items-center justify-center h-8 sticky left-0 top-0 z-[4] bg-gray-200">
            <Cell columnWidth={columnWidth.column1}></Cell>
            <Cell columnWidth={columnWidth.column2}>
                <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                    W:L(%) = {percentWin}:{percentLoss}
                </span>
            </Cell>
            <Cell columnWidth={columnWidth.column3}></Cell>
            <Cell columnWidth={columnWidth.column4}>
                <span className={portfolioRisk > 0 ? "text-red-600" : ""}>
                    ₽ {formatPrice(portfolioRisk)}
                </span>
            </Cell>
            <Cell columnWidth={columnWidth.column5}></Cell>
            <Cell columnWidth={columnWidth.column6}></Cell>
            <Cell columnWidth={columnWidth.column7}></Cell>
            <Cell columnWidth={columnWidth.column8}></Cell>
            <Cell columnWidth={columnWidth.column9}></Cell>
            <Cell columnWidth={columnWidth.column10}></Cell>
            <Cell columnWidth={columnWidth.column11}></Cell>
            <Cell columnWidth={columnWidth.column12}></Cell>
            <Cell columnWidth={columnWidth.column13}></Cell>
            <Cell columnWidth={columnWidth.column14}></Cell>
            <Cell columnWidth={columnWidth.column15}></Cell>
            <Cell columnWidth={columnWidth.column16}></Cell>
            <Cell columnWidth={columnWidth.column17}></Cell>
        </div>
    );
}
