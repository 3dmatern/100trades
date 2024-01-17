import Sheets from "@/components/ui/deals/sheets";
import { currentUser } from "@/lib/auth";
import { getSheets } from "@/actions/sheet";
import { getResults } from "@/actions/result";
import { getTags } from "@/actions/tag";
import { getRisksRewards } from "@/actions/riskReward";

export default async function SheetPage({ params }) {
    const { id } = params;
    const user = await currentUser();
    const sheetsData = await getSheets(user.id);
    const resultsData = await getResults();
    const risksRewarsData = await getRisksRewards();
    const tagsData = await getTags();

    return (
        <main className="mx-auto p-5 overflow-x-auto">
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
