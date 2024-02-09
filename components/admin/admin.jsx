import { cn } from "@/lib/utils";

import { AdminSelectSheet } from "./admin-select-sheet";
import { AdminSelectUser } from "./admin-select-user";

export function Admin({
    users,
    isSelectUserId,
    onSelectUser,
    sheets,
    onSelectSheet,
    className,
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-center md:flex-nowrap flex-wrap gap-5",
                className
            )}
        >
            <AdminSelectUser users={users} onSelectUser={onSelectUser} />
            <AdminSelectSheet
                sheets={sheets}
                isSelectUserId={isSelectUserId}
                onSelectSheet={onSelectSheet}
                className="w-64"
            />
        </div>
    );
}
