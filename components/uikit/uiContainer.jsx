import { cn } from "@/lib/utils";

export function UiContainer({children, className}) {

    return (
        <main className={cn("min-h-[calc(100vh-120px)]", className)}>
            {children}
        </main>
    );
}