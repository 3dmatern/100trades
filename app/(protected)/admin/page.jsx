"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSheets } from "@/hooks/use-sheets";
import { useResults } from "@/hooks/use-results";
import { useRisksRewards } from "@/hooks/use-risks-rewards";
import { useTags } from "@/hooks/use-tags";

import { useAdminUsersState } from "@/components/admin/use-admin-users-state";

import { Admin } from "@/components/admin";
import SheetWrapper from "@/components/sheet/sheetWrapper";
import Table from "@/components/deals/table";

export default function AdminPage() {
    const user = useCurrentUser();
    const { users, selectUserId, handleSelectUser } = useAdminUsersState(user);
    const { sheets, selectSheetId, handleSelectSheet } =
        useSheets(selectUserId);
    const { results } = useResults();
    const { risksRewards } = useRisksRewards();
    const { tags } = useTags(selectUserId);

    if (users.length === 0) {
        return (
            <div className="h-[calc(100vh-132px)] text-lg font-semibold text-center">
                Пользователей нет.
            </div>
        );
    }

    return (
        <main>
            <Admin
                users={users}
                onSelectUser={handleSelectUser}
                sheets={sheets}
                isSelectUserId={!!selectUserId}
                onSelectSheet={handleSelectSheet}
            />

            {!!selectSheetId && (
                <SheetWrapper className="md:h-[calc(100vh-168px)] h-[calc(100vh-240px)]">
                    <Table
                        userId={user.id}
                        sheetId={selectSheetId}
                        resultsData={results}
                        risksRewarsData={risksRewards}
                        tagsData={tags}
                        isAdmin={true}
                    />
                </SheetWrapper>
            )}
        </main>
    );
}
