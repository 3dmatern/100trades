import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getTags, getTagsByOffset } from "@/actions/tag";

export function useTags({ userId, skip, take }) {
    const [tags, setTags] = useState([]);
    const [tagsOffset, setTagsOffset] = useState([]);

    const handleOffsetTags = async (skip, take) => {
        const data = await getTagsByOffset(skip, take);

        if (data && data.error) {
            toast.error(data.error);
        } else {
            setTagsOffset(prev => data);
        }
    };

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

    useEffect(() => {
        if(skip && take) {
            
        }
    }, [skip, take]);

    return { tags };
}
