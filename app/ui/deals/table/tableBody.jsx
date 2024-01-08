import { getRandomHexColor } from "@/app/utils/getRandomHexColor";

import TableBodyCard from "./tableBodyCard";
import ButtonPlus from "../../common/buttonPlus";

const initTags = [
    { id: "tag1", label: "фиксировал часть", value: getRandomHexColor() },
    { id: "tag2", label: "человеческий фактор", value: getRandomHexColor() },
    { id: "tag3", label: "двигал стоп", value: getRandomHexColor() },
    { id: "tag4", label: "усреднял", value: getRandomHexColor() },
];

const initLPs = [
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
    onAddDeal,
}) {
    return (
        <div className="bg-white" style={{ height: "calc(100vh - 155px)" }}>
            {deals?.map((deal, index) => (
                <TableBodyCard
                    key={deal.id}
                    index={index}
                    deal={deal}
                    selectedDeals={selectedDeals}
                    tags={initTags}
                    lps={initLPs}
                    checkAll={checkAll}
                    columnWidth={columnWidth}
                    onChangeCheckbox={onChangeCheckbox}
                />
            ))}
            <div
                className={`flex items-center h-8 bg-white hover:bg-slate-50 border-r border-b`}
            >
                <div
                    style={{ width: columnWidth.column1 }}
                    className="flex items-center fixed border-r"
                >
                    <ButtonPlus
                        className={
                            "bg-white size-7 flex items-center justify-center"
                        }
                        onClick={onAddDeal}
                    />
                </div>
            </div>
        </div>
    );
}
