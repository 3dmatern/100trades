import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { getTagByIDs, getTagIDs, getTags, removeTagByIDs } from "@/actions/tag";
import { PAGE_SIZE_ALL_TAGS_ADMIN, TAKE_TAGS } from "./constants";
import { itemsCrop } from "@/utils/paginate";

export function useTags({ userId, skip, take }) {
  const [tags, setTags] = useState([]);
  const [{ currentPage, pageCount }, setPaginateData] = useState({
      currentPage: 1,
      pageCount: 0,
  });
  const [adminTags, setAdminTags] = useState([]);
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
    if (skip >= 0 && take) {
      const getData = async () => {
        const allTagIDsData = await dataTagIDs({ skip, take });

        if (allTagIDsData?.length) {
          const pageCount = Math.ceil(allTagIDsData.length / PAGE_SIZE_ALL_TAGS_ADMIN);
          const tagIDsCrop = itemsCrop(allTagIDsData, currentPage, PAGE_SIZE_ALL_TAGS_ADMIN);

          if (tagIDsCrop.length) {
            const tagsAdmin = await getDataTagByIDs(tagIDsCrop);

            if (tagsAdmin) { 
                setAdminTags((prev) => tagsAdmin);
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
  }, [skip, take, getDataTagByIDs]);

  const handleChangePage = async (selectPage) => {
    setPaginateData((prev) => ({
        ...prev,
        currentPage: selectPage,
    }));

    const newTagCrop = itemsCrop(tagIDs, selectPage, PAGE_SIZE_ALL_TAGS_ADMIN);
    const tagsAdmin = await getDataTagByIDs(newTagCrop);

    if(tagsAdmin) {
        setAdminTags((prev) => tagsAdmin);
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
    const tagsAdmin = await getDataTagByIDs(newTagCrop);

    if (tagsAdmin) {
      setAdminTags((prev) => tagsAdmin);
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
    const tagsAdmin = await getDataTagByIDs(newTagCrop);

    if (tagsAdmin) {
      setAdminTags((prev) => tagsAdmin);
    }
  };

  const handleRemoveAdminTag = async ({ items }) => {
    const ids = items.map((tag) => tag.id);
    const data = await removeTagByIDs(ids);
    
    if(data?.error) {
      toast.error(data.error);
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
      setAdminTags(prev => {
        const copy = prev.slice();
        return copy.filter((tag) => !ids.includes(tag.id));
      });
      handleChangePage(1);

      toast.success(`Удалено тегов: ${data.success.count} из ${ids.length}.`);
    }
  }

  return {
    tags,
    currentPage,
    pageCount,
    adminTags,
    onChangePage: handleChangePage,
    onClickPrevPage: handleClickPrevPage,
    onClickNextPage: handleClickNextPage,
    onRemoveAdminTag: handleRemoveAdminTag,
  };
}

async function dataTagIDs({ skip, take }, dataSoFar = []) {
  let updateTagIDs = [...dataSoFar];
  const data = await getTagIDs(skip, take);

  if(data?.success) {
    const tagIDsLength = data.success.length;
    
    updateTagIDs = [...updateTagIDs, ...data.success];

    if (tagIDsLength === TAKE_TAGS) {
      return dataTagIDs({ skip: skip + tagIDsLength, take }, updateTagIDs);
    }
  }

  return updateTagIDs;
}