"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  createEntrie,
  getEntries,
  removeEntrie,
  updateEntrie,
} from "@/actions/entrie";
import {
  progress,
  resetEveryonesProgress,
  updateEveryonesProgress,
} from "@/utils/operationsWithProgress";
import { dealLimitionDateWithTime } from "@/utils/formatedDate";

export function useDeals({
  isAdmin,
  userId,
  sheetId,
  onSort,
  onResetSort,
  onCRUDDeal,
}) {
  const router = useRouter();
  const [deals, setDeals] = useState([]);
  const [dealsInfo, setDealsInfo] = useState([]);
  const [isPending, setIsPending] = useState(undefined);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  useEffect(() => {
    if (sheetId) {
      const getData = async () => {
        const dealsData = await getEntries(isAdmin, userId, sheetId);

        if (dealsData?.error) {
          toast.error(dealsData.error);
        } else if (dealsData?.redirect) {
          router.push(dealsData.redirect);
        } else {
          setDeals((prev) => dealsData);
          setDealsInfo((prev) => dealsData);
        }
      };

      getData();
    } else {
      setDeals((prev) => []);
      setDealsInfo((prev) => []);
    }
  }, [isAdmin, router, sheetId, userId]);

  const handleCreateDeal = async (values) => {
    let newDealId = "";

    if (values?.deposit) {
      values = await modifiedValues({
        deals,
        values,
        userId,
        sheetId,
        setDeals,
        setDealsInfo,
      });
    }
    delete values?.id;

    const payload = {
      ...values,
      sheetId,
      entryDate: values?.entryDate || dealLimitionDateWithTime(Date.now()),
    };

    await createEntrie(userId, payload).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        const { success, newEntrie } = data;

        newDealId = newEntrie.id;

        if (newEntrie.name) {
          newEntrie.name = newEntrie.name.toUpperCase();
        }
        onCRUDDeal();
        setDeals((prev) => {
          const updDeals = prev.slice();
          updDeals.unshift({ ...newEntrie, number: prev.length + 1 });
          return updDeals;
        });
        setDealsInfo((prev) => {
          const updDeals = prev.slice();
          updDeals.unshift({ ...newEntrie, number: prev.length + 1 });
          return updDeals;
        });

        toast.success(success);
      }
    });

    return newDealId;
  };

  const handleUpdateDeal = async (values) => {
    setIsPending((prev) => values);

    try {
      const fixValues = await modifiedValues({
        deals,
        values,
        userId,
        sheetId,
        setDeals,
        setDealsInfo,
      });

      const data = await updateEntrie(userId, {
        ...fixValues,
        sheetId,
      });

      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        const { payload } = data;

        if (payload.name) {
          payload.name = payload.name.toUpperCase();
        }

        onCRUDDeal();
        setDeals((prev) => {
          const updatedDeals = prev.slice();

          const findIndexDealOfDeals = updatedDeals.findIndex(
            (d) => d.id === payload.id
          );

          if (findIndexDealOfDeals !== -1) {
            updatedDeals[findIndexDealOfDeals] = {
              ...updatedDeals[findIndexDealOfDeals],
              ...payload,
            };
          }

          setDealsInfo(updatedDeals);
          return updatedDeals;
        });
      }
    } catch (error) {
      toast.error("Ошибка обновления сделки!");
    }

    setIsPending(undefined);
  };

  const handleRemoveDeal = async () => {
    let removedDeal = [];
    let copySelectedDeals = selectedDeals;
    setSelectedDeals([]);

    setDeals((prev) =>
      prev.slice().filter((deal) => !copySelectedDeals.includes(deal.id))
    );
    setDealsInfo((prev) =>
      prev.slice().filter((deal) => !copySelectedDeals.includes(deal.id))
    );

    const allRemoved = await Promise.all(
      copySelectedDeals.map(
        async (dealId) =>
          await removeEntrie({ userId, sheetId, entrieId: dealId })
      )
    );

    const successLength = allRemoved.map((i) => {
      removedDeal.push(i.id);
      return i.success;
    }).length;

    removedDeal = copySelectedDeals.filter((d) => !removedDeal.includes(d));
    if (removedDeal.length > 0) {
      setDeals((prev) => [
        ...prev,
        ...prev.slice().filter((c) => removedDeal.includes(c.id)),
      ]);
      setDealsInfo((prev) => [
        ...prev,
        ...prev.slice().filter((c) => removedDeal.includes(c.id)),
      ]);
      setSelectedDeals(removedDeal);
    }

    onCRUDDeal();
    toast.success(`Удалено записей ${successLength} из ${allRemoved.length}`);

    setCheckAll(false);
  };

  const handleCheckAll = () => {
    setCheckAll((prev) => {
      !prev
        ? setSelectedDeals(deals.map((deal) => deal.id))
        : setSelectedDeals([]);
      return !prev;
    });
  };

  const handleCheckDeal = ({ target }) => {
    setSelectedDeals((prev) => {
      let prevCopy = prev.slice();

      if (prevCopy.includes(target.value)) {
        prevCopy = prevCopy.filter((item) => item !== target.value);
      } else {
        prevCopy = [...prevCopy, target.value];
      }

      if (prevCopy.length === 0) {
        setCheckAll(false);
      }

      return prevCopy;
    });
  };

  const handleSort = (data) => {
    setIsSortingEnabled(true);
    setDeals((prev) => {
      const filteredDeals = onSort(prev, data);
      return filteredDeals;
    });
  };

  const handleResetSort = () => {
    setIsSortingEnabled(false);
    setDeals((prev) => {
      const resetDeals = onResetSort(prev);
      return resetDeals;
    });
  };

  return {
    deals,
    dealsInfo,
    checkAll,
    selectedDeals,
    isSortingEnabled,
    isPending,
    onCreateDeal: handleCreateDeal,
    onUpdateDeal: handleUpdateDeal,
    onRemoveDeal: handleRemoveDeal,
    onCheckAll: handleCheckAll,
    onCheckDeal: handleCheckDeal,
    onSortDeals: handleSort,
    onResetSortDeals: handleResetSort,
  };
}

async function modifiedValues({
  deals,
  values,
  userId,
  sheetId,
  setDeals,
  setDealsInfo,
}) {
  const dealIndex = deals.findIndex((d) => d.id === values.id);
  const firstDeal = deals.reduce((minDeal, currentDeal) => {
    if (!minDeal || new Date(currentDeal.date) < new Date(minDeal.date)) {
      return currentDeal;
    }
    return minDeal;
  }, null);

  if (
    values.deposit &&
    firstDeal &&
    firstDeal?.deposit &&
    values.id !== firstDeal?.id
  ) {
    values.progress = progress(values.deposit, firstDeal?.deposit);
  } else if (values.id === firstDeal?.id && values.deposit === "") {
    await resetEveryonesProgress(
      deals,
      values,
      updateEntrie,
      userId,
      sheetId,
      toast,
      setDeals,
      setDealsInfo
    );
  } else if (
    values.id === firstDeal?.id &&
    values.deposit &&
    values.deposit !== ""
  ) {
    await updateEveryonesProgress(
      deals,
      progress,
      values,
      updateEntrie,
      userId,
      sheetId,
      toast,
      setDeals,
      setDealsInfo
    );
  } else if (dealIndex !== -1 && !Object.keys(values).includes("deposit")) {
    const findDealProgress = deals[dealIndex]?.progress;
    values.progress = findDealProgress ? findDealProgress : "";
  } else if (values.deposit === "") {
    values.progress = "";
  }

  return values;
}
