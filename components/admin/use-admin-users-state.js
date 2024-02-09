"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { getUsers } from "@/actions/user";

export function useAdminUsersState(user) {
    const [users, setUsers] = useState([]);
    const [selectUserId, setSelectUserId] = useState("");

    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            return redirect("/");
        } else {
            const getData = async () => {
                const users = await getUsers(user);
                if (users && users.error) {
                    toast.error(users.error);
                } else {
                    const filteredUsers = users.filter((u) => u.id !== user.id);
                    setUsers((prev) => filteredUsers);
                }
            };

            getData();
        }
    }, [user]);

    const handleSelectUser = (userId) => {
        setSelectUserId(userId);
    };

    return {
        users,
        selectUserId,
        handleSelectUser,
    };
}
