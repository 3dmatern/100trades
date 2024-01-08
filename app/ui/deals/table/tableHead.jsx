import CheckboxOrNumber from "./common/checkboxOrNumber";
import SelectFilterButton from "./common/selectFilterButton";

export default function TableHead({
    initHeaders,
    checkAll,
    columnWidth,
    onResize,
    onChange,
}) {
    return (
        <div className="flex items-center border-t border-b border-slate-300 bg-gray-50">
            {initHeaders.slice(0, 1).map((item) => (
                <SelectFilterButton
                    key={item.name}
                    name={item.name}
                    nameColumn="column1"
                    initWidth={columnWidth.column1}
                    onResize={onResize}
                    className="fixed z-10 bg-gray-50"
                    style={{ paddingLeft: "34px" }}
                    styleBtn={{ width: "100%" }}
                >
                    <CheckboxOrNumber
                        className={
                            "absolute top-1/2 left-0 -translate-y-1/2 bg-gray-50"
                        }
                        name="checkAll"
                        checked={checkAll}
                        onChange={onChange}
                    />
                </SelectFilterButton>
            ))}

            <div className="flex items-center ml-28">
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
        </div>
    );
}
