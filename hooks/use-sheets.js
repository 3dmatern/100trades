'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { getSheets, removeSheet, updateSheetPrivate } from "@/actions/sheet";

export function useSheets({ userId, sheetId }) {
  const router = useRouter();
  const [sheets, setSheets] = useState(null);
  const [selectSheetId, setSelectSheetId] = useState("");
  const [currentSheetColumns, setCurrentSheetColumns] = useState([]);

  const updSheetColumns = (currentColumns) => {
        delete currentColumns.date;
        delete currentColumns.id;
        delete currentColumns.userId;
        delete currentColumns.sheetId;

        setCurrentSheetColumns((prev) => currentColumns);
  };

  useEffect(() => {
    if (userId) {
      const getData = async () => {
        const sheetsData = await getSheets(userId);

        if (sheetsData && sheetsData.error) {
          toast.error(sheetsData.error);
        } else {
          setSheets((prev) => sheetsData);
        }
      };
      getData();
    }
  }, [userId]);

  useEffect(() => {
    const currentSheetId = sheetId || selectSheetId;

    if (sheets && currentSheetId) {
      const currentColumns = sheets.find(
        (sheet) => sheet.id === currentSheetId
      )?.sheetPrivate;
      
      if (currentColumns) {
        updSheetColumns(currentColumns);
      } else {
        setCurrentSheetColumns((prev) => []);
      }
    }
  }, [sheets, sheetId, selectSheetId]);

  const handleSelectSheet = (sheetId) => {
    setSelectSheetId(sheetId);
  };

  const handleSheetUpdate = ({ sheetId, updName }) => {
    setSheets((prev) => {
      const updSheets = prev.slice();
      const sheetIndex = updSheets.findIndex((p) => p.id === sheetId);

      if (sheetIndex !== -1) {
        updSheets[sheetIndex] = {
          ...updSheets[sheetIndex],
          name: updName,
        };
      }

      return updSheets;
    });
  };

  const handleRemoveSheet = async (sheetId) => {
    await removeSheet(sheetId, userId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          setSheets((prev) => {
            const filteredSheets = prev.filter((p) => p.id !== sheetId);
            if (filteredSheets.length > 0) {
              router.push(`/sheets/${sheets[0]?.id}`);
            } else {
              router.push("/sheets");
            }
            return filteredSheets;
          });
        }
      })
      .catch(() => {
        toast.error("Что-то пошло не так при удалении листа!");
      });
  };

  const handleUpdatePrivateSettings = async (values) => {    
    try {
      const data = await updateSheetPrivate(values);

      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        updSheetColumns(data.updSheetPrivate);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Что-то пошло не так при обновлении параметров!");
    }
  }

  return {
    sheets,
    selectSheetId,
    currentSheetColumns,
    onSelectSheet: handleSelectSheet,
    onSheetUpdate: handleSheetUpdate,
    onRemoveSheet: handleRemoveSheet,
    onUpdatePrivateSettings: handleUpdatePrivateSettings,
  };
}
