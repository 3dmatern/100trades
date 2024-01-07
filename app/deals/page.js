import Table from "../ui/deals/table/table";
import Navbar from "../ui/navbar";

export const metadata = {
    title: "Сделки",
    description: "Сделки трейдинга Homa-Trading",
};

export default function Page() {
    return (
        <div className="mx-auto p-5">
            <Navbar />
            <main className="mt-8 overflow-x-auto">
                <Table />
            </main>
        </div>
    );
}
