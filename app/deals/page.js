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
            <main className="pt-5">
                <Table />
            </main>
        </div>
    );
}
