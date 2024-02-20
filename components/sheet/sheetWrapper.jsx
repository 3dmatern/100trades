import { cn } from "@/lib/utils";

export default function SheetWrapper({ className, children }) {
    return (
        <main
            className={cn(
                "flex flex-col p-4 pb-0 relative overflow-x-hidden",
                className
            )}
        >
            {children}
        </main>
    );
}
