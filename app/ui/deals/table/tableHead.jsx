import CheckboxOrNumber from "./common/checkboxOrNumber";
import SelectFilterButton from "./common/selectFilterButton";

const initHeaders = [
    { name: "Тикер", up: false },
    { name: "Win-Loss", up: true },
    { name: "Поза", up: false },
    { name: "Риск", up: false },
    { name: "L:P", up: true },
    { name: "Вход", up: true },
    { name: "Скрин", up: true },
    { name: "Депозит", up: true },
    { name: "Прогресс", up: true },
    { name: "Выход", up: true },
    { name: "Скрин2", up: true },
    { name: "Пора?", up: false },
    { name: "Стресс", up: true },
    { name: "Tags", up: false },
    { name: "Заметки", up: false },
    { name: "Время в сделке", up: true },
    { name: "Для скрина (мин)", up: false },
    { name: "Actual Date", up: false },
    { name: "Assigne", up: false },
    { name: "Status", up: false },
];

export default function TableHead({ checkAll, onChange }) {
    return (
        <div className="flex items-center justify-between border-t border-b border-slate-300 bg-gray-50">
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
                            styleBtn={
                                item.up
                                    ? { "text-transform": "uppercase" }
                                    : null
                            }
                        />
                    );
                }
            })}
        </div>
    );
}
