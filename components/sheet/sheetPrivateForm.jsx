"use client";

import { useEffect, useState } from "react";

import SheetSettingsForm from "@/components/sheet/common/sheetSettingsForm";
import { ITEMS } from "@/components/constants";

export default function SheetPrivateForm({
  userId,
  sheetId,
  currentSheetColumns,
  onUpdatePrivateSettings
}) {
  const [sheetColumns, setSheetColumns] = useState([]);

  useEffect(() => {
    if (currentSheetColumns) {
      const columns = Object.values(currentSheetColumns).filter((d) => d !== null);

      setSheetColumns((prev) => columns)
    } else {
      setSheetColumns((prev) => ITEMS.map((item) => item.id));
    }
  }, [currentSheetColumns]);

  const onSubmitUpdate = async (values) => {
    await onUpdatePrivateSettings(values);
  };

  return (
      <SheetSettingsForm
        userId={userId}
        sheetId={sheetId}
        itemsData={sheetColumns}
        items={ITEMS}
        onSubmit={onSubmitUpdate}
        isPrivate={true}
      />
  );
}
