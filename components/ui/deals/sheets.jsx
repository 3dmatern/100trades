"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Sheet from "@/components/ui/deals/sheet";
import Table from "@/components/ui/deals/table";
import AddSheetButton from "./common/addSheetButton";
import { removeSheet } from "@/actions/sheet";

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

    const handleUpdateSheet = async ({ sheetId, updName }) => {
        setSheets((prev) =>
            prev.map((p) => p.id === sheetId && { ...p, name: updName })
        );
    };

    const handleRemoveSheet = async (sheetId) => {
        const sheet = sheets.find((s) => s.id === sheetId);
        setSheets((prev) => prev.filter((p) => p.id !== sheetId));

        await removeSheet({ sheetId, userId })
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    setSheets((prev) =>
                        [...prev, sheet].sort((a, b) => {
                            const start = new Date(a.date).getTime();
                            const end = new Date(b.date).getTime();
                            return start - end;
                        })
                    );
                }
                if (data.success) {
                    toast.success(data.success);
                }
            })
            .catch(() => {
                toast.error("Что-то пошло не так!");
                setSheets((prev) =>
                    [...prev, sheet].sort((a, b) => {
                        const start = new Date(a.date).getTime();
                        const end = new Date(b.date).getTime();
                        return start - end;
                    })
                );
            });
    };

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
                toast.error(sheetsData.error);
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
                            onUpdateSheet={handleUpdateSheet}
                            onRemoveSheet={handleRemoveSheet}
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
