import CheckboxOrNumber from "./common/checkboxOrNumber";
import SelectFilterButton from "./common/selectFilterButton";

const initHeaders = [
    { name: "Тикер", up: false, w: "112px" },
    { name: "Win-Loss", up: true, w: "96px" },
    { name: "Поза", up: false, w: "80px" },
    { name: "Риск", up: false, w: "64px" },
    { name: "L:P", up: true, w: "64px" },
    { name: "Вход", up: true, w: "128px" },
    { name: "Скрин", up: true, w: "96px" },
    { name: "Депозит", up: true, w: "112px" },
    { name: "Прогресс", up: true, w: "112px" },
    { name: "Выход", up: true, w: "128px" },
    { name: "Скрин2", up: true, w: "96px" },
    { name: "Пора?", up: false, w: "112px" },
    { name: "Стресс", up: true, w: "112px" },
    { name: "Tags", up: false, w: "288px" },
    { name: "Заметки", up: false, w: "176px" },
    { name: "Время в сделке", up: true, w: "128px" },
    { name: "Для скрина (мин)", up: false, w: "128px" },
];

export default function TableHead({ checkAll, onChange }) {
    return (
        <div className="flex items-center border-t border-b border-slate-300 bg-gray-50">
            {initHeaders.map((item, index) => {
                if (index === 0) {
                    return (
                        <div
                            key={item.name}
                            className="flex items-center justify-between w-28"
                        >
                            <CheckboxOrNumber
                                name="checkAll"
                                checked={checkAll}
                                onChange={onChange}
                            />
                            <SelectFilterButton
                                key={item.name}
                                name={item.name}
                                className="w-4/5"
                                styleBtn={{ width: "100%" }}
                            />
                        </div>
                    );
                } else {
                    return (
                        <SelectFilterButton
                            key={item.name}
                            name={item.name}
                            style={{ width: item.w }}
                            styleBtn={
                                item.up
                                    ? {
                                          "text-transform": "uppercase",
                                          width: "100%",
                                      }
                                    : { width: "100%" }
                            }
                        />
                    );
                }
            })}
        </div>
    );
}
