"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    createSheetPublished,
    deleteSheetPublished,
    getSheetPublishedBySheetId,
    updateSheetPublished,
} from "@/actions/sheetPublished";
import SheetIsPublished from "@/components/sheet/sheetIsPublished";
import SheetSettingsForm from "@/components/sheet/common/sheetSettingsForm";
import { ITEMS } from "@/components/constants";

export default function SheetPublishedForm({ userId, sheetId }) {
  const [isPublished, setIsPublished] = useState(false);
  const [sheetColumns, setSheetColumns] = useState([]);
  const [sheetPublishedId, setSheetPublishedId] = useState("");

  useEffect(() => {
    const sheetPublished = async () => {
      const data = await getSheetPublishedBySheetId(sheetId);

      if (data) {
        if (data?.error) {
          setIsPublished(false);
        } else {
          setSheetPublishedId(data.id);
          setIsPublished(true);

          delete data.date;
          delete data.id;
          delete data.userId;
          delete data.sheetId;

          const columns = Object.values(data).filter((d) => d !== null);

          setSheetColumns((prev) => columns)
        }
      } else {
        setSheetColumns((prev) => ITEMS.map((item) => item.id));
      }
    };

    sheetPublished();
  }, [sheetId]);

  const handleDelete = async () => {
    try {
      const data = await deleteSheetPublished(sheetPublishedId, userId);
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        setSheetColumns((prev) => ITEMS.map((item) => item.id));
        setSheetPublishedId("");
        setIsPublished(false);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(
          "Что-то пошло не так при удалении листа из публикации!"
      );
    }
  };

  const onSubmitCreate = async (values) => {
    try {
      const data = await createSheetPublished(values);

      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        const { newSheetPublished, success } = data;
        toast.success(success);

        setSheetColumns((prev) => values.items);
        setSheetPublishedId(newSheetPublished.id);
        setIsPublished(true);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Что-то пошло не так при публикации листа!");
    }
  };

  const onSubmitUpdate = async (values) => {
    try {
      const data = await updateSheetPublished(values);

      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        const { updSheetPublished, success } = data;
        toast.success(success);

        setSheetColumns((prev) => values.items);
        setSheetPublishedId(updSheetPublished.id);
        setIsPublished(true);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Что-то пошло не так при обновлении параметров!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SheetSettingsForm
        userId={userId}
        sheetId={sheetId}
        itemsData={sheetColumns}
        items={ITEMS}
        onSubmit={isPublished ? onSubmitUpdate : onSubmitCreate}
        isUpdate={isPublished}
      />
     {isPublished && <SheetIsPublished
        sheetPublishedId={sheetPublishedId}
        onClick={handleDelete}
      />}
    </div>
  );
}
