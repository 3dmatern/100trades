"use client";

import { BeatLoader } from "react-spinners";

import TablePublishedBodyCard from "@/components/dealsPublished/tablePublishedBodyCard";

export default function TableBody({
    deals,
    results,
    longShorts,
    allRRs,
    allTags,
    columnWidth,
}) {
    return deals && deals.length >= 0 ? (
        deals?.map((deal, index) => (
            <TablePublishedBodyCard
                key={deal.id}
                index={index}
                deal={deal}
                results={results}
                longShorts={longShorts}
                allRRs={allRRs}
                allTags={allTags}
                entrieTag={deal.entrieTag}
                columnWidth={columnWidth}
            />
        ))
    ) : (
        <div className={`flex items-center justify-center h-8`}>
            <BeatLoader />
        </div>
    );
}
