import { cn } from "@/lib/utils";

export function TableContainer({ className, children }) {
    return (
        <div
            className={cn(
                "table w-max h-full mx-auto border-collapse",
                className
            )}
        >
            {children}
        </div>
    );
}
