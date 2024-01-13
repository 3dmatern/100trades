"use client";

import Sheets from "@/components/ui/deals/sheets";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const initSheets = [
    { id: "s1", name: "Лист 1" },
    { id: "s2", name: "Лист 2" },
    { id: "s3", name: "Лист 3" },
];

export default function DealsPage() {
    const user = useCurrentUser();
    return (
        <main className="mx-auto p-5 overflow-x-auto">
            <Sheets className="mt-8" sheets={initSheets} />
        </main>
    );
}
