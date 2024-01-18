import CheckboxOrNumber from "@/components/ui/deals/common/checkboxOrNumber";
import SelectFilterButton from "@/components/ui/deals/common/selectFilterButton";

export default function TableHead({
    initHeaders,
    checkAll,
    columnWidth,
    onResize,
    onCheckAll,
    onSort,
}) {
    return (
        <div className="flex items-center h-8 border-t border-b border-slate-300 bg-gray-50">
            {initHeaders.slice(0, 1).map((item) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    dbName={item.dbName}
                    nameColumn="column1"
                    initWidth={columnWidth.column1}
                    onResize={onResize}
                    onSort={onSort}
                    className="sticky left-0 z-[2]"
                    classNameContent="pl-8 pr-2 bg-gray-50 border-l"
                    styleBtn={{ width: "100%" }}
                >
                    <CheckboxOrNumber
                        name="checkAll"
                        checked={checkAll}
                        onChange={onCheckAll}
                        className="size-7 absolute top-1/2 left-[2px] -translate-y-1/2 bg-gray-50"
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
                    onSort={onSort}
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
