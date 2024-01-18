import { auth, signOut } from "@/auth";

export const currentUser = async () => {
    const session = await auth();

    if (!session) {
        signOut();
        return;
    }
    return session.user;
};
