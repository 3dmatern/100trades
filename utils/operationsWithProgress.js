export function progress(newValue, firstValue) {
    const progress = (((newValue - firstValue) / firstValue) * 100).toFixed(2);

    return progress;
}

export async function resetEveryonesProgress(
    array,
    values,
    onUpdate,
    userId,
    sheetId,
    toast
) {
    for (const deal of array) {
        if (deal.id !== values.id && deal.deposit && deal.progress) {
            const data = await onUpdate(userId, {
                id: deal.id,
                sheetId,
                progress: "",
            });

            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                const { payload } = data;
                const updArray = array.slice();
                const findIndex = updArray.findIndex(
                    (d) => d.id === payload.id
                );

                if (findIndex !== -1) {
                    updArray[findIndex] = payload;
                }

                return updArray;
            }
        }
    }
}

export async function updateEveryonesProgress(
    array,
    onProgress,
    values,
    onUpdate,
    userId,
    sheetId,
    toast
) {
    for (const deal of array) {
        if (deal.id !== values.id && deal.deposit) {
            const progress = onProgress(deal.deposit, values.deposit);
            const data = await onUpdate(userId, {
                id: deal.id,
                sheetId,
                progress,
            });
            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                const { payload } = data;
                const updArray = array.slice();
                const findIndex = updArray.findIndex(
                    (d) => d.id === payload.id
                );

                if (findIndex !== -1) {
                    updArray[findIndex] = payload;
                }
                return updArray;
            }
        }
    }
}
