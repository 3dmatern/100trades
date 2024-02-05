"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Sheet from "@/components/ui/sheet/sheet";
import AddSheetButton from "../deals/common/addSheetButton";
import { removeSheet } from "@/actions/sheet";
import { Button } from "@/components/ui/button";

export default function Sheets({ userId, sheetsData, sheetId }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const router = useRouter();
    const [sheetRefs, setSheetRefs] = useState([]);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [sheets, setSheets] = useState([]);

    const handleUpdateSheet = async ({ sheetId, updName }) => {
        setSheets((prev) => {
            const updatedSheets = [...prev];
            const findIndex = updatedSheets.findIndex((s) => s.id === sheetId);

            if (findIndex !== -1) {
                updatedSheets[findIndex] = {
                    ...updatedSheets[findIndex],
                    name: updName,
                };
            }

            return updatedSheets;
        });
    };

    const handleRemoveSheet = async (sheetId) => {
        await removeSheet(sheetId, userId)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }
                if (data.success) {
                    toast.success(data.success);
                    setSheets((prev) => prev.filter((p) => p.id !== sheetId));
                }
            })
            .catch(() => {
                toast.error("Что-то пошло не так при удалении листа!");
            });
    };

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
        if (sheetsData) {
            if (sheetsData.error) {
                toast.error(sheetsData.error);
                return;
            }
            setSheets(sheetsData);
        }
    }, [sheetsData]);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content && sheets.length > 0) {
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
    }, [containerRef, contentRef, sheets.length]);

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

    useEffect(() => {
        if (sheetsData && sheetsData.length === 0) {
            router.push("/sheets");
        } else if (sheetId && sheetsData && sheetsData.length > 0) {
            const sheet = sheetsData.find((s) => s.id === sheetId);
            if (!sheet) {
                router.push(`/sheets/${sheetsData[0].id}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheetId, sheetsData]);

    return (
        <div className="relative">
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
                    {sheets.length > 0 &&
                        sheets?.map((sheet) => (
                            <Sheet
                                key={sheet.id}
                                selectSheet={sheetId}
                                sheet={sheet}
                                userId={userId}
                                onAddSheetRef={setSheetRefs}
                                onUpdateSheet={handleUpdateSheet}
                                onRemoveSheet={handleRemoveSheet}
                                className={
                                    sheetId === sheet.id
                                        ? "bg-gray-200"
                                        : "bg-gray-100"
                                }
                            />
                        ))}
                    <AddSheetButton
                        userId={userId}
                        onOpenForm={setIsOpenForm}
                    />
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
