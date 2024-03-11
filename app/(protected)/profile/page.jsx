import { currentUser } from "@/lib/auth";

import { UserInfo } from "@/components/profile/userInfo";

export const metadata = {
    title: "Профиль",
    description: "Страница профиля журнала сделок Homa-Trading",
};

export default async function ProfilePage() {
    const user = await currentUser();

    return (
        <main className="w-full md:flex items-start justify-center gap-8 mt-8">
            <UserInfo label="Профиль" user={user} />
        </main>
    );
}
