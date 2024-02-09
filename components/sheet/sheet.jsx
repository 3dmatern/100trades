"use client";

import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import SettingsSheet from "@/components/sheet/settingsSheet";

export default function Sheet({
    selectSheet,
    sheet,
    userId,
    onAddSheetRef,
    onUpdateSheet,
    onRemoveSheet,
    isAdmin,
    className,
}) {
    const sheetRef = useRef(null);
    const router = useRouter();
    const [isPendingRemove, setIsPendingRemove] = useState(false);

    const handleRemoveSheet = (e, sheetId) => {
        e.stopPropagation();
        const isComfirmed = window.confirm(
            "Вы уверены, что хотите удалить этот ресурс?"
        );
        if (isComfirmed) {
            setIsPendingRemove(true);
            onRemoveSheet(sheetId);
            setIsPendingRemove(false);
        }
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
                    {!isAdmin && sheet.id === selectSheet && (
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
