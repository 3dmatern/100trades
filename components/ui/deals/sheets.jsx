"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Sheet from "@/components/ui/deals/sheet";
import Table from "@/components/ui/deals/table";
import AddSheetButton from "./common/addSheetButton";

export default function Sheets({
    className,
    userId,
    sheetsData,
    sheetId,
    resultsData,
    risksRewarsData,
    tagsData,
}) {
    const [sheets, setSheets] = useState([]);
    const [results, setResults] = useState([]);
    const [risksRewards, setRisksRewards] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (resultsData) {
            if (resultsData.error) {
                toast.error(resultsData.error);
                return;
            }
            setResults(resultsData);
        }
    }, [resultsData]);

    useEffect(() => {
        if (risksRewarsData) {
            if (risksRewarsData.error) {
                toast.error(risksRewarsData.error);
                return;
            }
            setRisksRewards(risksRewarsData);
        }
    }, [risksRewarsData]);

    useEffect(() => {
        if (tagsData) {
            if (tagsData.error) {
                toast.error(tagsData.error);
                return;
            }
            setTags(tagsData);
        }
    }, [tagsData]);

    useEffect(() => {
        if (sheetsData) {
            if (sheetsData.error) {
                toast.error(error);
                return;
            }
            setSheets(sheetsData);
        }
    }, [sheetsData]);

    return (
        <div className={className}>
            <div className="flex items-center justify-start gap-1 h-9">
                {sheets.length > 0 &&
                    sheets?.map((sheet) => (
                        <Sheet
                            key={sheet.id}
                            selectSheet={sheetId}
                            sheet={sheet}
                            userId={userId}
                            className={
                                sheetId === sheet.id
                                    ? "bg-gray-100"
                                    : "bg-gray-200"
                            }
                        />
                    ))}
                <AddSheetButton userId={userId} />
            </div>
            <Table
                userId={userId}
                sheetId={sheetId}
                results={results}
                risksRewards={risksRewards}
                tags={tags}
            />
        </div>
    );
}
