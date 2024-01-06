import Table from "../ui/deals/table/table";
import Navbar from "../ui/navbar";

export const metadata = {
    title: "Сделки",
    description: "Сделки трейдинга Homa-Trading",
};

export default function Page() {
    return (
        <div className="relative mx-auto p-5 h-screen overflow-y-hidden">
            <Navbar />
            <main className="absolute inset-y-20">
                <Table />
            </main>
        </div>
    );
}
