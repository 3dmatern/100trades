import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function AddTableRow({
    columnWidth,
    onCreateDeal,
    selectedDeals,
    onRmoveDeal,
    isSortingEnabled,
    onResetSort,
}) {
    return (
        <div className="flex items-center h-8 relative border-r border-b border-slate-300 bg-white hover:bg-slate-50">
            <div className="table-cell align-middle h-full sticky left-0 z-[1] bg-white">
                <div
                    style={{
                        width: columnWidth.column1,
                        minWidth: "64px",
                    }}
                    className="flex items-center h-full border-l border-r border-slate-300 bg-inherit hover:bg-inherit"
                >
                    <Button
                        type="button"
                        onClick={onCreateDeal}
                        className="flex items-center justify-center size-7 p-1 rounded-sm bg-slate-50 hover:bg-slate-200"
                    >
                        <Image
                            src="/plus-lg.svg"
                            alt="plus"
                            width={16}
                            height={16}
                        />
                    </Button>
                </div>

                {selectedDeals.length > 0 && (
                    <Button
                        type="button"
                        onClick={onRmoveDeal}
                        style={{
                            left: isSortingEnabled
                                ? `${parseInt(columnWidth.column1) + 120}px`
                                : `${parseInt(columnWidth.column1) - 70}px`,
                        }}
                        className="w-max h-7 absolute top-1/2 -translate-y-1/2 bg-red-700 hover:bg-red-600 ml-20 text-sm"
                    >
                        Удалить выбранные сделки
                    </Button>
                )}

                {isSortingEnabled && (
                    <Button
                        type="button"
                        onClick={onResetSort}
                        style={{
                            left: `${parseInt(columnWidth.column1) - 70}px`,
                        }}
                        className="w-max h-7 absolute top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-300 ml-20 text-sm"
                    >
                        Сбросить сортировку
                    </Button>
                )}
            </div>
        </div>
    );
}
