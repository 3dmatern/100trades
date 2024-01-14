import Image from "next/image";

import { getRandomHexColor } from "@/utils/getRandomHexColor";

import TableBodyCard from "@/components/ui/deals/tableBodyCard";
import { Button } from "@/components/ui/button";

const initTags = [
    { id: "tag1", label: "фиксировал часть", value: getRandomHexColor() },
    { id: "tag2", label: "человеческий фактор", value: getRandomHexColor() },
    { id: "tag3", label: "двигал стоп", value: getRandomHexColor() },
    { id: "tag4", label: "усреднял", value: getRandomHexColor() },
];

const initRRs = [
    { id: "lp1", label: "1:2", value: getRandomHexColor() },
    { id: "lp2", label: "1:7", value: getRandomHexColor() },
    { id: "lp3", label: "1:10", value: getRandomHexColor() },
];

export default function TableBody({
    deals,
    selectedDeals,
    checkAll,
    columnWidth,
    onChangeCheckbox,
    onChange,
    onCreateDeal,
}) {
    return (
        <div className="bg-white h-screen">
            {deals.length > 0 ? (
                deals?.map((deal, index) => (
                    <TableBodyCard
                        key={deal.id}
                        index={index}
                        deal={deal}
                        selectedDeals={selectedDeals}
                        tags={initTags}
                        rrs={initRRs}
                        checkAll={checkAll}
                        columnWidth={columnWidth}
                        onChangeCheckbox={onChangeCheckbox}
                    />
                ))
            ) : (
                <div className="flex items-center justify-center h-8 border">
                    <p className="text-xl font-semibold drop-shadow-md">
                        Записей нет...
                    </p>
                </div>
            )}
            <div
                className={`flex items-center h-8 bg-white hover:bg-slate-50 border-r border-b`}
            >
                <div
                    style={{ width: columnWidth.column1 }}
                    className="flex items-center sticky top-0 left-0 border-l border-r"
                >
                    <Button
                        type="button"
                        onClick={onCreateDeal}
                        className="flex items-center justify-center size-7 p-1 rounded-sm bg-slate-50 hover:bg-slate-200"
                    >
                        <Image
                            src="./plus-lg.svg"
                            alt="plus"
                            width={16}
                            height={16}
                        />
                    </Button>
                </div>

                {selectedDeals.length > 0 && (
                    <Button
                        type="button"
                        className="w-max bg-red-700 hover:bg-red-600 ml-20 text-sm"
                    >
                        Удалить выбранные сделки
                    </Button>
                )}
            </div>
        </div>
    );
}
