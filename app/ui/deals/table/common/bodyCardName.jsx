import CheckboxOrNumber from "./checkboxOrNumber";

export default function BodyCardName({
    index,
    dealId,
    dealName,
    selectedDeals,
    checkAll,
    dealHover,
    onChangeCheckbox,
}) {
    return (
        <div
            className={`flex items-center w-28 fixed  ${
                selectedDeals?.includes(dealId) || dealHover
                    ? "bg-slate-50"
                    : "bg-white"
            }`}
        >
            <CheckboxOrNumber
                number={index + 1}
                name="deals"
                value={dealId}
                checked={selectedDeals?.includes(dealId)}
                checkAll={checkAll}
                onChange={onChangeCheckbox}
            />

            <div className="flex items-center border-r h-8 px-2 text-xs w-4/5">
                {dealName}
            </div>
        </div>
    );
}
