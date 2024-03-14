import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function AdminSelectSheet({
    sheets,
    isSelectUserId = false,
    onSelectSheet,
    className,
}) {
    return (
        <Select onValueChange={onSelectSheet} disabled={!isSelectUserId}>
            <SelectTrigger className={cn("w-52 truncate", className)}>
                <SelectValue placeholder="Выбрать журнал пользователя" />
            </SelectTrigger>
            <SelectContent>
                {sheets?.map((sheet) => (
                    <SelectItem key={sheet.id} value={sheet.id}>
                        {sheet.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
