import { currentUser } from "@/lib/auth";
import { getSheetsWithEntrieWL } from "@/actions/sheet";

import { UserInfo } from "@/components/profile/userInfo";
import { UserStatistics } from "@/components/profile/userStatistics";

export const metadata = {
    title: "Профиль",
    description: "Страница профиля журнала сделок Homa-Trading",
};

export default async function ProfilePage() {
    const user = await currentUser();
    const dealsWLByUserId = await getSheetsWithEntrieWL(user.id);

    return (
        <main className="w-full h-[calc(100%-172px)] mt-8 px-5 flex flex-col items-center justify-center gap-8 md:h-[calc(100vh-132px)] md:flex-row md:items-start">
            <UserInfo user={user} />
            <UserStatistics dealsWLByUserId={dealsWLByUserId} />
        </main>
    );
}
