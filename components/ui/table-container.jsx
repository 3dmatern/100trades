import { cn } from "@/lib/utils";

export function TableContainer({ className, tableRef, children }) {
    return (
        <div ref={tableRef} className={cn("table w-max h-full border-collapse", className)}>
            {children}
        </div>
    );
}
