import { cn } from "@/lib/utils";

export function TableContainer({ className, children }) {
    return (
        <div className={cn("table w-max h-full border-collapse", className)}>
            {children}
        </div>
    );
}
