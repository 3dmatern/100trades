"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    deleteSheetPublished,
    getSheetPublishedBySheetId,
} from "@/actions/sheetPublished";
import SheetIsPublished from "@/components/sheet/sheetIsPublished";
import SheetCreatePublishedForm from "@/components/sheet/sheetCreatePublishedForm";
import SheetUpdatePublishedForm from "@/components/sheet/sheetUpdatePublishedForm";

export default function SheetPublishedForm({ userId, sheetId }) {
    const [isPublished, setIsPublished] = useState(false);
    const [sheetPublishedId, setSheetPublishedId] = useState("");

    const handleDelete = async () => {
        try {
            const data = await deleteSheetPublished(sheetPublishedId, userId);
            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                toast.success(data.success);
                setSheetPublishedId("");
                setIsPublished(false);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(
                "Что-то пошло не так при удалении листа из публикации!"
            );
        }
    };

    useEffect(() => {
        const sheetPublished = async () => {
            const data = await getSheetPublishedBySheetId(sheetId);
            if (data) {
                if (data?.error) {
                    setIsPublished(false);
                } else {
                    setSheetPublishedId(data.id);
                    setIsPublished(true);
                }
            }
        };

        sheetPublished();
    }, [sheetId]);

    if (isPublished) {
        return (
            <>
                <SheetUpdatePublishedForm
                    userId={userId}
                    sheetId={sheetId}
                    setIsPublished={setIsPublished}
                    setSheetPublishedId={setSheetPublishedId}
                />
                <SheetIsPublished
                    sheetPublishedId={sheetPublishedId}
                    onClick={handleDelete}
                />
            </>
        );
    } else {
        return (
            <SheetCreatePublishedForm
                userId={userId}
                sheetId={sheetId}
                setIsPublished={setIsPublished}
                setSheetPublishedId={setSheetPublishedId}
            />
        );
    }
}
