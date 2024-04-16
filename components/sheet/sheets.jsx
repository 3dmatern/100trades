"use client";

import { useEffect, useRef, useState } from "react";

import Sheet from "@/components/sheet/sheet";
import SheetAddButton from "@/components/sheet/sheetAddButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sheets({
    userId,
    sheets,
    sheetId,
    currentSheetColumns,
    sheetWidth,
    onSheetUpdate,
    onRemoveSheet,
    isAdmin = false,
    onUpdatePrivateSettings,
}) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [sheetRefs, setSheetRefs] = useState([]);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleScroll = (direction) => {
        const container = containerRef.current;
        const pixelOffset = 150; // Задайте значение смещения в пикселях по вашему выбору

        const scrollAmount = direction === "left" ? -pixelOffset : pixelOffset;

        container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (container && content && sheets?.length > 0) {
            const isScrollEnabled =
                container.scrollWidth > container.clientWidth;

            const checkOverflow = () => {
                setIsOverflowed(isScrollEnabled);
            };

            checkOverflow();

            window.addEventListener("resize", checkOverflow);

            return () => {
                window.removeEventListener("resize", checkOverflow);
            };
        }
    }, [containerRef, contentRef, sheets]);

    useEffect(() => {
        const container = containerRef.current;
        if (isOpenForm && container) {
            const isScrollEnabled =
                container.scrollWidth > container.clientWidth;

            if (isScrollEnabled) {
                container.scrollTo({
                    left: container.scrollWidth - container.clientWidth,
                    behavior: "smooth",
                });
            }
        }
    }, [isOpenForm, containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (sheetId && sheetRefs && sheetRefs.length > 0 && container) {
            const sheet = sheetRefs.find((s) => s.id === sheetId);
            if (sheet && sheet.offsetLeft) {
                container.scrollTo({
                    left: sheet.offsetLeft,
                    behavior: "smooth",
                });
            }
        }
    }, [sheetId, containerRef, sheetRefs]);

    return (
        <div className="relative" style={
            sheetWidth > 0 ? { width: sheetWidth + "px", margin: "0 auto"} : { width: "100%" }
        }>
            <div
                ref={containerRef}
                style={{
                    padding: isOverflowed ? "0px 40px" : "0",
                }}
                className={`relative overflow-x-auto no-scrollbar mx-auto`}
            >
                <div
                    ref={contentRef}
                    className={`flex items-center justify-start gap-1 w-max h-9 whitespace-nowrap transition-all duration-300 ease-in-out`}
                >
                    {sheets &&
                        sheets.length > 0 &&
                        sheets?.map((sheet) => (
                            <Sheet
                                key={sheet.id}
                                className={
                                    sheetId === sheet.id
                                        ? "bg-gray-200"
                                        : "bg-gray-100"
                                }
                                selectSheet={sheetId}
                                sheet={sheet}
                                userId={userId}
                                currentSheetColumns={currentSheetColumns}
                                onAddSheetRef={setSheetRefs}
                                onUpdateSheet={onSheetUpdate}
                                onRemoveSheet={onRemoveSheet}
                                onUpdatePrivateSettings={onUpdatePrivateSettings}
                                isAdmin={isAdmin}
                            />
                        ))}
                    {!isAdmin && (
                        <SheetAddButton
                            userId={userId}
                            onOpenForm={setIsOpenForm}
                        />
                    )}
                </div>
            </div>

            {isOverflowed && (
                <>
                    <Button
                        type="button"
                        className="flex items-center justify-center size-9 absolute left-0 top-1/2 transform -translate-y-1/2 z-[3] bg-gray-300"
                        onClick={() => handleScroll("left")}
                    >
                        ←
                    </Button>
                    <Button
                        type="button"
                        className="flex items-center justify-center size-9 absolute right-0 top-1/2 transform -translate-y-1/2 z-[3] bg-gray-300"
                        onClick={() => handleScroll("right")}
                    >
                        →
                    </Button>
                </>
            )}
        </div>
    );
}
