"use client";

import { FormError } from "@/components/formError";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function RoleGate({ children, allowedRole }) {
    const { role } = useCurrentUser();

    if (role !== allowedRole) {
        return (
            <FormError message="У вас нет разрешения на просмотр этого контента!" />
        );
    }

    return <>{children}</>;
}
