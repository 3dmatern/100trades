import { getSheetPublished } from "@/actions/sheetPublished";
import { Published } from "@/components/published/published";

export async function generateMetadata({ params, searchParams }) {
    const metadata = {
        description: "Журнал Cделок трейдинга Homa-Trading",
    };
    const { id } = searchParams;
    const { userNick, sheetName } = await getSheetPublished(id);

    if (!userNick) {
        return {
            ...metadata,
            title: `Журнал Сделок / user / ${sheetName}`,
        };
    }

    return {
        ...metadata,
        title: `Журнал Сделок / ${userNick} / ${sheetName}`,
    };
}

export default function PublishedPage({ searchParams }) {
    const { id } = searchParams;

    return <Published sheetPublishedId={id} />;
}
