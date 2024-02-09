import { useSession, signOut } from "next-auth/react";

export const useCurrentUser = () => {
    const { data: session, status } = useSession();

    if (!session) {
        signOut();
        return;
    }
    return session.user;
};
