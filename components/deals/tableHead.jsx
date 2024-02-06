import { initHeaders } from "@/app/api/initData";
import CheckboxOrNumber from "@/components/deals/common/checkboxOrNumber";
import SelectFilterButton from "@/components/deals/common/selectFilterButton";

export default function TableHead({
    checkAll,
    columnWidth,
    onResize,
    onCheckAll,
    onSort,
}) {
    const filteredDBName = (dbName) => {
        switch (dbName) {
            case "imageStart":
                return null;
            case "imageEnd":
                return null;
            case "entrieTag":
                return null;

            default:
                return dbName;
        }
    };

    return (
        <div className="flex items-center h-8 sticky left-0 top-8 z-[3] border-t border-b border-slate-300 bg-gray-50">
            {initHeaders.slice(0, 1).map((item) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    dbName={item.dbName}
                    isSort={item.dbName}
                    nameColumn="column1"
                    initWidth={columnWidth.column1}
                    onResize={onResize}
                    onSort={onSort}
                    className="sticky left-0 z-[3]"
                    classNameContent="pl-8 pr-2 bg-gray-50 border-l"
                    classNameList="z-[2]"
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
                    dbName={item.dbName}
                    isSort={filteredDBName(item.dbName)}
                    nameColumn={`column${index + 2}`}
                    initWidth={columnWidth[`column${index + 2}`]}
                    onResize={onResize}
                    onSort={onSort}
                    classNameList="z-[1]"
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
