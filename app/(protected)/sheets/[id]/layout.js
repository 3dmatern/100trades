import { getSheet } from "@/actions/sheet";

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

export default function SheetLayout({ children }) {
    return children;
}
