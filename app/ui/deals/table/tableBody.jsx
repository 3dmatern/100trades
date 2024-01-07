import TableBodyCard from "./tableBodyCard";

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
                    deal={deal}
                    selectedDeals={selectedDeals}
                    checkAll={checkAll}
                    onChangeCheckbox={onChangeCheckbox}
                />
            ))}
        </div>
    );
}
