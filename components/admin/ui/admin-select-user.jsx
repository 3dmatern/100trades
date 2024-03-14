import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function AdminSelectUser({ users, onSelectUser, className }) {
    return (
        <Select onValueChange={onSelectUser}>
            <SelectTrigger className={cn("w-52 truncate", className)}>
                <SelectValue placeholder="Выбрать пользователя" />
            </SelectTrigger>
            <SelectContent>
                {users.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                        {u.nickname || u.email}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
