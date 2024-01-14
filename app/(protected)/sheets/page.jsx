import { currentUser } from "@/lib/auth";
import { getSheets } from "@/actions/sheet";
import Sheets from "@/components/ui/deals/sheets";

export default async function SheetsPage() {
    const user = await currentUser();
    const sheets = await getSheets(user.id);

    return (
        <main className="mx-auto p-5 overflow-x-auto">
            <Sheets className="mt-8 h-full" userId={user.id} sheets={sheets} />
        </main>
    );
}
