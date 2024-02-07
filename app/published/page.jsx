import Link from "next/link";

import { getResults } from "@/actions/result";
import { getRisksRewards } from "@/actions/riskReward";
import { getSheetPublished } from "@/actions/sheetPublished";
import SheetWrapper from "@/components/sheet/sheetWrapper";
import TablePublished from "@/components/dealsPublished/tablePublished";
import { Button } from "@/components/ui/button";
import NotFound from "../not-found";

export default async function PublishedPage({ searchParams }) {
    const { id } = searchParams;
    const sheetPublished = await getSheetPublished(id);
    const resultsData = await getResults();
    const risksRewardsData = await getRisksRewards();

    if (!sheetPublished) {
        return <NotFound />;
    }

    return (
        <>
            <div className="flex items-center justify-between pt-5 px-5">
                <h1 className="text-2xl font-bold">Журнал Cделок</h1>

                <Button asChild>
                    <Link href="/">На главную</Link>
                </Button>
            </div>

            <div className="flex items-center justify-center gap-5 flex-wrap mt-5">
                <span className="font-semibold">
                    Название журнала:{" "}
                    <span className="font-mono rounded-md bg-gray-200 py-1 px-2">
                        {sheetPublished?.sheetName}
                    </span>
                </span>
                <span className="font-semibold">
                    Владелец:{" "}
                    <span className="font-mono rounded-md bg-gray-200 py-1 px-2">
                        {sheetPublished?.userNick}
                    </span>
                </span>
            </div>
            <SheetWrapper>
                <TablePublished
                    dealsData={sheetPublished?.deals}
                    results={resultsData}
                    allTags={sheetPublished?.tagsUser}
                    allRRs={risksRewardsData}
                />
            </SheetWrapper>
        </>
    );
}
