import { Button } from "@/components/ui/button";

export default function ActionTableRow({
    selectedDeals,
    onRemoveDeal,
    isSortingEnabled,
    onResetSort,
}) {
    return (
        <div className="flex items-center h-8 relative border-r border-b border-slate-300 bg-white hover:bg-slate-50">
            <div className="table-cell align-middle h-7 sticky left-0 z-[1] border-l bg-white">
                {selectedDeals?.length > 0 && (
                    <Button
                        type="button"
                        onClick={onRemoveDeal}
                        className="w-max h-7 bg-red-700 hover:bg-red-600 ml-5 text-sm"
                    >
                        Удалить выбранные сделки
                    </Button>
                )}

                {isSortingEnabled && (
                    <Button
                        type="button"
                        onClick={onResetSort}
                        className="w-max h-7 bg-blue-500 hover:bg-blue-300 ml-5 text-sm"
                    >
                        Сбросить сортировку
                    </Button>
                )}
            </div>
        </div>
    );
}
