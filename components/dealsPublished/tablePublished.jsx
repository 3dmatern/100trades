"use client";

import React, { useEffect, useState } from "react";

import TablePublishedHead from "@/components/dealsPublished/tablePublishedHead";
import TablePublishedBody from "@/components/dealsPublished/tablePublishedBody";
import {
    sortByAsc,
    sortByAscDate,
    sortByAscRR,
    sortByAscResult,
    sortByAscString,
    sortByDesc,
    sortByDescDate,
    sortByDescRR,
    sortByDescResult,
    sortByDescString,
} from "@/utils/sortBy";
import TablePublishedInfo from "@/components/dealsPublished/tablePublishedInfo";
import { COLUMN_WIDTH } from "@/components/constants";
import { useLongShort } from "@/hooks/use-long-short";

export default function TablePublished({
    dealsData,
    results,
    allRRs,
    allTags,
}) {
    const { longShorts } = useLongShort();
    const [deals, setDeals] = useState(COLUMN_WIDTH);
    const [columnWidth, setColumnWidth] = useState(COLUMN_WIDTH);

    const handleResize = (column, newWidth) => {
        setColumnWidth((prevWidths) => ({
            ...prevWidths,
            [column]: newWidth,
        }));
    };

    const handleSort = (data) => {
        const sortByOrderString = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscString(prev, iter)]
                    : [...sortByDescString(prev, iter)]
            );
        };

        const sortByOrderNumber = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAsc(prev, iter)]
                    : [...sortByDesc(prev, iter)]
            );
        };

        const sortByOrderResult = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscResult(prev, iter, results)]
                    : [...sortByDescResult(prev, iter, results)]
            );
        };

        const sortByOrderRR = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscRR(prev, iter, risksRewards)]
                    : [...sortByDescRR(prev, iter, risksRewards)]
            );
        };

        const sortByOrderDate = ({ iter, order }) => {
            setDeals((prev) =>
                order === "asc"
                    ? [...sortByAscDate(prev, iter)]
                    : [...sortByDescDate(prev, iter)]
            );
        };

        switch (data.iter) {
            case "name":
            case "take":
            case "notes":
            case "progress":
                sortByOrderString(data);
                break;

            case "pose":
            case "risk":
            case "profit":
            case "deposit":
            case "stress":
            case "timeInTrade":
                sortByOrderNumber(data);
                break;

            case "resultId":
                sortByOrderResult(data);
                break;

            case "rrId":
                sortByOrderRR(data);
                break;

            case "entryDate":
            case "exitDate":
                sortByOrderDate(data);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        setDeals(dealsData);
    }, [dealsData]);

    return (
        <div className="flex-1 h-full relative overflow-x-auto">
            <div className="table mx-auto w-max h-full border-collapse">
                <TablePublishedInfo
                    columnWidth={columnWidth}
                    deals={deals}
                    results={results}
                />
                <TablePublishedHead
                    deal={deals[0]}
                    columnWidth={columnWidth}
                    onResize={handleResize}
                    onSort={handleSort}
                />
                <TablePublishedBody
                    deals={deals}
                    results={results}
                    longShorts={longShorts}
                    allRRs={allRRs}
                    allTags={allTags}
                    columnWidth={columnWidth}
                />
            </div>
        </div>
    );
}
