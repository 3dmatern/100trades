"use client";

import { useEffect, useState } from "react";

import Cell from "./common/cell";
import { formatPrice } from "@/utils/formattedNumber";

export default function TableInfo({
    columnWidth,
    dealsInfo,
    results,
    isPublished = false,
}) {
    const [percentWin, setPercentWin] = useState(0);
    const [percentLoss, setPercentLoss] = useState(0);
    const [portfolioRisk, setPortfolioRisk] = useState(0);
    const [portfolioProgress, setPortfolioProgress] = useState("");
    const [portfolioAverageTime, setPortfolioAverageTime] = useState("");

    useEffect(() => {
        if (results?.length > 0 && dealsInfo?.length > 0) {
            let quantityWin = 0;
            let quantityLoss = 0;
            let quantityNoLoss = 0;
            let riskSum = 0;
            let lastProgress = 0;
            let totalClosedDeal = 0;
            let quantityHours = 0;
            let quantityMinutes = 0;

            dealsInfo.forEach((d) => {
                if (d.timeInTrade) {
                    const [hours, iterHours, minutes, iterMinutes] =
                        parseTimeInTrade(d.timeInTrade);
                    quantityHours += +hours;
                    quantityMinutes += +minutes;
                    totalClosedDeal++;
                }

                if (d.progress) {
                    lastProgress = d.progress;
                }

                results.forEach((r) => {
                    if (r.id === d.resultId) {
                        switch (r.type) {
                            case 1:
                                quantityWin++;
                                break;
                            case 2:
                                quantityLoss++;
                                break;
                            case 3:
                                quantityNoLoss++;
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

            if (lastProgress) {
                setPortfolioProgress((prev) => lastProgress);
            } else {
                setPortfolioProgress("");
            }

            if (totalClosedDeal > 0) {
                quantityHours += Math.floor(quantityMinutes / 60);

                quantityHours = Math.ceil(quantityHours / totalClosedDeal);
                quantityMinutes = Math.floor(
                    (quantityMinutes % 60) / totalClosedDeal
                );
            }

            setPortfolioRisk(riskSum);
            setPortfolioAverageTime(
                (prev) => `${quantityHours} ч. ${quantityMinutes} мин.`
            );
        } else {
            setPercentWin(0);
            setPercentLoss(0);
            setPortfolioRisk(0);
            setPortfolioProgress("");
            setPortfolioAverageTime("");
        }
    }, [dealsInfo, results]);

    return (
        <div className="flex items-center h-8 sticky left-0 top-0 z-[4] bg-gray-200">
            {dealsInfo?.[0]?.name !== undefined && (
                <Cell columnWidth={columnWidth.column1}></Cell>
            )}
            {dealsInfo?.[0]?.resultId !== undefined && (
                <Cell columnWidth={columnWidth.column2}>
                    <span className=" overflow-hidden whitespace-nowrap text-ellipsis">
                        W:L(%) = {percentWin}:{percentLoss}
                    </span>
                </Cell>
            )}
            {dealsInfo?.[0]?.lsId !== undefined && (
                <Cell columnWidth={columnWidth.column3}></Cell>
            )}
            {dealsInfo?.[0]?.pose !== undefined && (
                <Cell columnWidth={columnWidth.column4}></Cell>
            )}
            {dealsInfo?.[0]?.risk !== undefined && (
                <Cell columnWidth={columnWidth.column5}>
                    <span className={portfolioRisk > 0 ? "text-red-600" : ""}>
                        ₽ {formatPrice(portfolioRisk)}
                    </span>
                </Cell>
            )}
            {dealsInfo?.[0]?.profit !== undefined && (
                <Cell columnWidth={columnWidth.column6}></Cell>
            )}
            {dealsInfo?.[0]?.rrId !== undefined && (
                <Cell columnWidth={columnWidth.column7}></Cell>
            )}
            {dealsInfo?.[0]?.entryDate !== undefined && (
                <Cell columnWidth={columnWidth.column8}></Cell>
            )}
            {dealsInfo?.[0]?.imageStart !== undefined && (
                <Cell columnWidth={columnWidth.column9}></Cell>
            )}
            {dealsInfo?.[0]?.deposit !== undefined && (
                <Cell columnWidth={columnWidth.column10}></Cell>
            )}
            {dealsInfo?.[0]?.progress !== undefined && (
                <Cell columnWidth={columnWidth.column11}>
                    {portfolioProgress || "0.00"}%
                </Cell>
            )}
            {dealsInfo?.[0]?.exitDate !== undefined && (
                <Cell columnWidth={columnWidth.column12}></Cell>
            )}
            {dealsInfo?.[0]?.imageEnd !== undefined && (
                <Cell columnWidth={columnWidth.column13}></Cell>
            )}
            {dealsInfo?.[0]?.take !== undefined && (
                <Cell columnWidth={columnWidth.column14}></Cell>
            )}
            {dealsInfo?.[0]?.stress !== undefined && (
                <Cell columnWidth={columnWidth.column15}></Cell>
            )}
            {isPublished && dealsInfo?.[0]?.entrieTag === undefined ? null : (
                <Cell columnWidth={columnWidth.column16}></Cell>
            )}
            {dealsInfo?.[0]?.notes !== undefined && (
                <Cell columnWidth={columnWidth.column17}></Cell>
            )}
            {dealsInfo?.[0]?.timeInTrade !== undefined && (
                <Cell columnWidth={columnWidth.column18}>
                    ~ {portfolioAverageTime}
                </Cell>
            )}
        </div>
    );
}

function parseTimeInTrade(time) {
    const parseTime = time.split(" ");
    return parseTime;
}
