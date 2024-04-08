"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { createTake, getTakes } from "@/actions/take";
import {
  createEntrieTake,
  getEntrieTakes,
  removeEntrieTake,
} from "@/actions/entrieTake";

export default function BodyCardTakes({
  userId,
  dealId,
  allTakes,
  onUpdateAllTakes,
  columnWidth,
  dealHover,
  selectedDeals,
  determineTextColor,
  getRandomHexColor,
  onActionDeal,
  isAdmin,
  isPublished,
}) {
  const selectRef = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [filteredTakes, setFilteredTakes] = useState([]);
  const [currentTakes, setCurrentTakes] = useState(null);
  const [take, setTake] = useState("");
  const [takeBgColor, setTakeBgColor] = useState("");

  const handleItemSearch = ({ target }) => {
    if (target.name === "take") {
      setTake((prev) => target.value);
      setFilteredTakes((prev) =>
        allTakes.filter((take) => take.label.includes(target.value))
      );
    }
  };

  const handleSelectTake = async (take) => {
    setOpen((prev) => false);
    setActive((prev) => false);
    setTake((prev) => "");
    let selectTake = take;
    let updTakes = allTakes;
    let newDealId = "";

    if (!selectTake.id) {
      const { newTake, success, error } = await createTake({
        ...take,
        userId,
      });

      if (error) {
        toast.error(error);
        return;
      } else {
        toast.success(success);
        selectTake = newTake;
        updTakes = await getTakes(userId);
        onUpdateAllTakes(updTakes);
      }
    }

    if (!dealId) {
      newDealId = await onActionDeal();
    }

    const { success, error } = await createEntrieTake(userId, {
      entrieId: dealId || newDealId,
      takeId: selectTake.id,
    });
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
      getEntrieTakesData(updTakes, dealId);
    }
  };

  const handleRemoveTake = async (e, takeId) => {
    e.stopPropagation();
    setOpen((prev) => false);
    setActive((prev) => false);

    await removeEntrieTake(userId, { entrieId: dealId, takeId }).then(
      (data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          setCurrentTakes((prev) => prev.filter((take) => take.id !== takeId));
        }
      }
    );
  };

  const getEntrieTakesData = async (takes, dealId) => {
    if (dealId) {
      const entrieTakesData = await getEntrieTakes(dealId);
      if (entrieTakesData.error) {
        toast.error(entrieTakesData.error);
      } else {
        setCurrentTakes((prev) =>
          takes?.filter((take) =>
            entrieTakesData.entrieTakes.some((et) => take.id === et.takeId)
          )
        );
      }
    } else {
      setCurrentTakes((prev) => []);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const list = listRef.current;
      const rect = list.getBoundingClientRect();

      if (rect.bottom > window.innerHeight - 32) {
        list.style.top = "unset";
        list.style.bottom = "32px";
      }
    }
  }, [open]);

  useEffect(() => {
    if (allTakes) {
      setFilteredTakes((prev) => allTakes);
    }
  }, [allTakes]);

  useEffect(() => {
    if ((allTakes, dealId)) {
      getEntrieTakesData(allTakes, dealId);
    } else {
      setCurrentTakes((prev) => []);
    }
  }, [allTakes, dealId]);

  useEffect(() => {
    if (open) {
      setTakeBgColor((prev) => getRandomHexColor());
    }
  }, [getRandomHexColor, open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen((prev) => false);
        setActive((prev) => false);
      }
    };
    const handleScroll = () => {
      setOpen((prev) => false);
      setActive((prev) => false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={selectRef} className="table-cell relative h-full">
      <div
        onClick={() => setActive((prev) => true)}
        style={{ width: columnWidth, minWidth: "64px" }}
        className="flex items-center justify-start h-full"
      >
        <div
          className={`flex justify-start gap-1 w-full text-xs ${
            selectedDeals?.includes(dealId) || dealHover
              ? "bg-slate-50"
              : "bg-white"
          } ${
            active && !isAdmin && !isPublished
              ? "items-start flex-wrap h-16 overflow-y-auto absolute top-0 left-0 z-[1] p-1 border border-blue-800"
              : "items-center h-full border-r px-2 overflow-hidden"
          }`}
        >
          {!currentTakes ? (
            <BeatLoader size={7} className="mx-auto" />
          ) : (
            currentTakes.map((t) => (
              <span
                key={t.label}
                style={{
                  color: determineTextColor(t.value),
                  backgroundColor: t.value,
                }}
                className="flex items-center gap-1 rounded-xl px-2 py-px"
              >
                <span className="whitespace-nowrap text-ellipsis">
                  {t.label}
                </span>
                {active && !isAdmin && !isPublished && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTake(e, t.id)}
                    className="p-0.5 cursor-pointer"
                  >
                    <Image
                      src="/remove.svg"
                      alt="remove"
                      width={10}
                      height={10}
                    />
                  </button>
                )}
              </span>
            ))
          )}

          {active && !isAdmin && !isPublished && (
            <Button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center justify-center size-4 p-0.5 rounded-sm bg-slate-200 hover:bg-slate-300"
            >
              <Image src="/plus-lg.svg" alt="plus" width={10} height={10} />
            </Button>
          )}
        </div>
      </div>

      {open && !isAdmin && !isPublished && (
        <div
          ref={listRef}
          style={{ width: columnWidth }}
          className="absolute top-16 left-0 z-[5] rounded-md py-2 bg-white border border-gray-300"
        >
          <input
            type="number"
            step={0.1}
            min={0}
            name="take"
            value={take}
            placeholder="Введите тейк"
            onChange={handleItemSearch}
            className="w-full mb-1 py-1 px-2 text-xs outline-none"
          />

          {filteredTakes.length > 0 ? (
            <ul
              className={`
                    w-full max-h-12 px-2 flex items-center justify-start flex-wrap gap-1 
                    text-xs bg-white overflow-y-auto no-scrollbar
                `}
            >
              {filteredTakes
                .filter((t) => !currentTakes?.some((item) => item.id === t.id))
                .map((take) => (
                  <li
                    key={take.label}
                    onClick={() => handleSelectTake(take)}
                    className="flex items-center justify-start hover:bg-slate-200 cursor-pointer"
                  >
                    <span
                      key={take.label}
                      style={{
                        color: determineTextColor(take.value),
                        backgroundColor: take.value,
                      }}
                      className="rounded-xl px-2 py-px"
                    >
                      {take.label}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="flex items-center gap-1 px-2 text-xs">
              Добавить тейк:{" "}
              <span
                style={{
                  color: determineTextColor(takeBgColor),
                  backgroundColor: takeBgColor,
                }}
                onClick={() =>
                  handleSelectTake({
                    label: take,
                    value: takeBgColor,
                  })
                }
                className="rounded-xl px-2 py-px cursor-pointer"
              >
                {take}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
