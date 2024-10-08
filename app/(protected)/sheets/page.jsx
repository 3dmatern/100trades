import Link from "next/link";

import { currentUser } from "@/lib/auth";
import { getSheets } from "@/actions/sheet";
import { UiContainer } from "@/components/uikit/uiContainer";
import SheetAddButton from "@/components/sheet/sheetAddButton";

export const metadata = {
    title: "Листы сделок",
    description: "Листы сделок Homa-Trading",
};

export default async function SheetsPage() {
    const user = await currentUser();
    const sheetsData = await getSheets(user.id);

    return (
        <UiContainer className="container p-5 overflow-x-auto">
            <h1 className="mt-8 text-center text-2xl font-semibold">
                Листы сделок
            </h1>
            <div className="w-max mx-auto mt-8 grid md:grid-cols-5 grid-cols-3 justify-items-center gap-3">
                {sheetsData.length > 0 &&
                    sheetsData?.map((sheet) => (
                        <Link
                            key={sheet.id}
                            href={`/sheets/${sheet.id}`}
                            className="w-max py-2 px-3 bg-gray-200 hover:bg-gray-100 rounded-sm"
                        >
                            {sheet.name}
                        </Link>
                    ))}

                <SheetAddButton
                    className="w-max h-10 py-2 px-3 bg-gray-200 hover:bg-gray-100 rounded-sm"
                    classNameBtn="size-10"
                    userId={user.id}
                />
            </div>
        </UiContainer>
    );
}
