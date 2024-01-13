"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { FormError } from "@/components/formError";

export function RoleGate({ children, allowedRole }) {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="У вас нет разрешения на просмотр этого контента!" />
        );
    }

    return <>{children}</>;
}
