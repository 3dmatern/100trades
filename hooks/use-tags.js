import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTags } from "@/actions/tag";

export function useTags(userId) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (userId) {
            const getData = async () => {
                const tagsData = await getTags(userId);
                if (tagsData && tagsData.error) {
                    toast.error(tagsData.error);
                } else {
                    setTags(tagsData);
                }
            };
            getData();
        } else {
            setTags([]);
        }
    }, [userId]);

    return { tags };
}
