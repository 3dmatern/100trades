import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { getTagByIDs, getTagIDsByUserId, getTags, removeTagByIDs } from "@/actions/tag";
import { PAGE_SIZE_ALL_TAGS_ADMIN, TAKE_TAGS } from "./constants";
import { itemsCrop } from "@/utils/paginate";

export function useTags({ userId, skip, take }) {
  const [tags, setTags] = useState([]);
  const [{ currentPage, pageCount }, setPaginateData] = useState({
      currentPage: 1,
      pageCount: 0,
  });
  const [userTags, setUserTags] = useState([]);
  // TODO: initTagIDs возможно понадобиться для филтра и т.п.
  const [initTagIDs, setInitTagIDs] = useState([]);
  const [tagIDs, setTagIDs] = useState([]);

  const getDataTagByIDs = useCallback(async (newTagIDs) => {
    const tagsData = await getTagByIDs(newTagIDs);

    if (tagsData?.error) {
      toast.error(tagsData.error);
    } else {
      return tagsData.success;
    }
  }, []);

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
    if (userId && skip >= 0 && take) {
      const getData = async () => {
        const allTagIDsData = await dataTagIDs({ userId, skip, take });

        if (allTagIDsData?.length) {
          const pageCount = Math.ceil(allTagIDsData.length / PAGE_SIZE_ALL_TAGS_ADMIN);
          const tagIDsCrop = itemsCrop(allTagIDsData, currentPage, PAGE_SIZE_ALL_TAGS_ADMIN);

          if (tagIDsCrop.length) {
            const tagsUser = await getDataTagByIDs(tagIDsCrop);

            if (tagsUser) { 
                setUserTags((prev) => tagsUser);
            }
          }

          setPaginateData((prev) => ({
            ...prev,
            pageCount
          }));
          setInitTagIDs((prev) => allTagIDsData);
          setTagIDs((prev) => allTagIDsData);
        }
      };

      getData();
    }
  }, [userId, skip, take, getDataTagByIDs]);

  const handleChangePage = async (selectPage) => {
    setPaginateData((prev) => ({
        ...prev,
        currentPage: selectPage,
    }));

    const newTagCrop = itemsCrop(tagIDs, selectPage, PAGE_SIZE_ALL_TAGS_ADMIN);
    const tagsUser = await getDataTagByIDs(newTagCrop);

    if(tagsUser) {
        setUserTags((prev) => tagsUser);
    }
  };

  const handleClickPrevPage = async () => {
    if (currentPage === 1 || pageCount === 0) return;

    const selectPage = currentPage - 1;

    setPaginateData((prev) => ({
      ...prev,
      currentPage: selectPage,
    }));

    const newTagCrop = itemsCrop(tagIDs, selectPage, PAGE_SIZE_ALL_TAGS_ADMIN);
    const tagsUser = await getDataTagByIDs(newTagCrop);

    if (tagsUser) {
      setUserTags((prev) => tagsUser);
    }
  };

  const handleClickNextPage = async () => {
    if (currentPage === pageCount || pageCount === 0) return;

    const selectPage = currentPage + 1;

    setPaginateData((prev) => ({
      ...prev,
      currentPage: selectPage,
    }));

    const newTagCrop = itemsCrop(tagIDs, selectPage, PAGE_SIZE_ALL_TAGS_ADMIN);
    const tagsUser = await getDataTagByIDs(newTagCrop);

    if (tagsUser) {
      setUserTags((prev) => tagsUser);
    }
  };

  const handleRemoveUserTag = async ({ items }) => {
    const ids = items.map((tag) => tag.id);
    const data = await removeTagByIDs(ids);
    
    if(data?.error) {
      toast.error(data.error);
      return false;
    } else {
      setInitTagIDs(prev => {
        const copy = prev.slice();
        const clearCopy = copy.filter((tagID) => !ids.includes(tagID));
        const pageCount = Math.ceil(clearCopy.length / PAGE_SIZE_ALL_TAGS_ADMIN);

        setPaginateData((prev) => ({
          ...prev,
          currentPage: 1,
          pageCount
        }));
        
        return clearCopy;
      });
      setTagIDs(prev => {
        const copy = prev.slice();
        return copy.filter((tagID) => !ids.includes(tagID));
      });
      setUserTags(prev => {
        const copy = prev.slice();
        return copy.filter((tag) => !ids.includes(tag.id));
      });
      handleChangePage(1);

      toast.success(`Удалено тегов: ${data.success.count} из ${ids.length}.`);
      return true;
    }
  }

  return {
    tags,
    currentPage,
    pageCount,
    userTags,
    onChangePage: handleChangePage,
    onClickPrevPage: handleClickPrevPage,
    onClickNextPage: handleClickNextPage,
    onRemoveUserTag: handleRemoveUserTag,
  };
}

async function dataTagIDs({userId, skip, take }, dataSoFar = []) {
  let updateTagIDs = [...dataSoFar];
  const data = await getTagIDsByUserId(userId, skip, take);

  if(data?.success) {
    const tagIDsLength = data.success.length;
    
    updateTagIDs = [...updateTagIDs, ...data.success];

    if (tagIDsLength === TAKE_TAGS) {
      return dataTagIDs({ userId, skip: skip + tagIDsLength, take }, updateTagIDs);
    }
  }

  return updateTagIDs;
}