import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { getSheets, removeSheet } from "@/actions/sheet";

export function useSheets(userId) {
    const router = useRouter();
    const [sheets, setSheets] = useState(null);
    const [selectSheetId, setSelectSheetId] = useState("");

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
                        const filteredSheets = prev.filter(
                            (p) => p.id !== sheetId
                        );
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

    return {
        sheets,
        selectSheetId,
        handleSelectSheet,
        handleSheetUpdate,
        handleRemoveSheet,
    };
}
