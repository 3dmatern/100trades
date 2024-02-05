import Sheets from "@/components/sheet/sheets";
import { currentUser } from "@/lib/auth";
import { getSheet, getSheets } from "@/actions/sheet";
import { getResults } from "@/actions/result";
import { getTags } from "@/actions/tag";
import { getRisksRewards } from "@/actions/riskReward";
import Table from "@/components/deals/table";

export async function generateMetadata({ params }) {
    // прочитать параметры маршрута
    const id = params.id;

    // получить данные
    const sheet = await getSheet(id);
    if (sheet) {
        return {
            title: sheet.name,
        };
    }
}

export default async function SheetPage({ params, searchParams }) {
    const { id } = params;

    const user = await currentUser();
    const sheetsData = await getSheets(user.id);
    const resultsData = await getResults();
    const risksRewarsData = await getRisksRewards();
    const tagsData = await getTags(user.id);

    return (
        <main
            style={{ height: `calc(100vh - 104px)` }}
            className="flex flex-col mx-auto mt-8 p-4 pb-0 relative overflow-x-hidden"
        >
            <Sheets userId={user.id} sheetsData={sheetsData} sheetId={id} />

            <Table
                userId={user.id}
                sheetId={id}
                resultsData={resultsData}
                risksRewarsData={risksRewarsData}
                tagsData={tagsData}
            />
        </main>
    );
}
