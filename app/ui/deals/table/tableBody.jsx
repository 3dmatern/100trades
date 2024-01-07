import { getRandomHexColor } from "@/app/utils/getRandomHexColor";

import TableBodyCard from "./tableBodyCard";

const initTags = [
    { id: "tag1", label: "фиксировал часть", value: getRandomHexColor() },
    { id: "tag2", label: "человеческий фактор", value: getRandomHexColor() },
    { id: "tag3", label: "двигал стоп", value: getRandomHexColor() },
    { id: "tag4", label: "усреднял", value: getRandomHexColor() },
];

export default function TableBody({
    deals,
    selectedDeals,
    checkAll,
    onChangeCheckbox,
    onChange,
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
                    checkAll={checkAll}
                    onChangeCheckbox={onChangeCheckbox}
                />
            ))}
        </div>
    );
}
