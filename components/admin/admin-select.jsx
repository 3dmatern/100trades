import { cn } from "@/lib/utils";

import { AdminSelectSheet } from "@/components/admin/ui/admin-select-sheet";
import { AdminSelectUser } from "@/components/admin/ui/admin-select-user";

export function AdminSelect({
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
