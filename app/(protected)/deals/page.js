import Navbar from "@/components/ui/navbar";

import Sheets from "@/components/ui/deals/sheets";

export const metadata = {
    title: "Сделки",
    description: "Сделки трейдинга Homa-Trading",
};

const initSheets = [
    { id: "s1", name: "Лист 1" },
    { id: "s2", name: "Лист 2" },
    { id: "s3", name: "Лист 3" },
];

export default async function Page() {
    return (
        <div className="mx-auto p-5">
            <Navbar />
            <main className="overflow-x-auto">
                <Sheets className="mt-8" sheets={initSheets} />
            </main>
        </div>
    );
}
