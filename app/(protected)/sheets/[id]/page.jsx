import Sheets from "@/components/ui/deals/sheets";
import { currentUser } from "@/lib/auth";
import { getSheet, getSheets } from "@/actions/sheet";
import { getResults } from "@/actions/result";
import { getTags } from "@/actions/tag";
import { getRisksRewards } from "@/actions/riskReward";

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
    const tagsData = await getTags();

    return (
        <main className="mx-auto p-4 overflow-x-scroll">
            <Sheets
                className="mt-8 h-full"
                userId={user.id}
                sheetsData={sheetsData}
                sheetId={id}
                resultsData={resultsData}
                risksRewarsData={risksRewarsData}
                tagsData={tagsData}
            />
        </main>
    );
}
