"use client";

import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SettingsSheet from "./settingsSheet";

export default function Sheet({
    className,
    selectSheet,
    sheet,
    userId,
    onAddSheetRef,
    onUpdateSheet,
    onRemoveSheet,
}) {
    const sheetRef = useRef(null);
    const router = useRouter();
    const [isPendingRemove, setIsPendingRemove] = useState(false);

    const handleRemoveSheet = (e, sheetId) => {
        e.stopPropagation();
        setIsPendingRemove(true);
        onRemoveSheet(sheetId);
        setIsPendingRemove(false);
    };

    useEffect(() => {
        const list = sheetRef.current;
        if (sheet && list) {
            const offsetLeft = list.offsetLeft;
            onAddSheetRef((prev) => [...prev, { id: sheet.id, offsetLeft }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheet, sheetRef]);

    return (
        <div
            ref={sheetRef}
            id={sheet.id}
            onClick={() => router.push(`/sheets/${sheet.id}`)}
            className={cn(
                `flex items-center justify-center gap-1 w-max h-9 px-2 relative hover:bg-gray-300 rounded-t-lg cursor-pointer`,
                className
            )}
        >
            {isPendingRemove ? (
                <BeatLoader size={10} />
            ) : (
                <>
                    <span>{sheet.name}</span>
                    {sheet.id === selectSheet && (
                        <SettingsSheet
                            sheet={sheet}
                            userId={userId}
                            onUpdateSheet={onUpdateSheet}
                            onRemoveSheet={handleRemoveSheet}
                        />
                    )}
                </>
            )}
        </div>
    );
}
