import CheckboxOrNumber from "@/components/ui/deals/common/checkboxOrNumber";
import SelectFilterButton from "@/components/ui/deals/common/selectFilterButton";

export default function TableHead({
    initHeaders,
    checkAll,
    columnWidth,
    onResize,
    onCheckAll,
}) {
    return (
        <div className="flex items-center relative border-t border-b border-slate-300 bg-gray-50">
            {initHeaders.slice(0, 1).map((item) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    nameColumn="column1"
                    initWidth={columnWidth.column1}
                    onResize={onResize}
                    className="sticky top-0 left-0 z-20 bg-gray-50 border-l"
                    style={{ paddingLeft: "34px" }}
                    styleBtn={{ width: "100%" }}
                >
                    <CheckboxOrNumber
                        className={
                            "absolute top-1/2 left-0 -translate-y-1/2 bg-gray-50"
                        }
                        name="checkAll"
                        checked={checkAll}
                        onChange={onCheckAll}
                    />
                </SelectFilterButton>
            ))}

            {initHeaders.slice(1).map((item, index) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    nameColumn={`column${index + 2}`}
                    initWidth={columnWidth[`column${index + 2}`]}
                    onResize={onResize}
                    styleBtn={
                        item.up
                            ? {
                                  textTransform: "uppercase",
                                  width: "100%",
                              }
                            : { width: "100%" }
                    }
                />
            ))}
        </div>
    );
}
