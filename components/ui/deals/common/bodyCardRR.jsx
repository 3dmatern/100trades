"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { createRiskReward, getRisksRewards } from "@/actions/riskReward";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { updateEntrie } from "@/actions/entrie";

export default function BodyCardRR({
    userId,
    sheetId,
    dealId,
    rrId,
    columnWidth,
    determineTextColor,
}) {
    const listRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [risksRewards, setRisksRewards] = useState([]);
    const [filterRRs, setFilterRRs] = useState([]);
    const [lpBgColor, setLPBgColor] = useState("");
    const [currentRR, setCurrentRR] = useState(undefined);
    const [rr, setRR] = useState("");

    const handleChange = (value) => {
        setRR(value);
        setFilterRRs((prev) => prev.filter((p) => p.label.includes(value)));
    };

    const handleSelectLP = (e, rr) => {
        e.stopPropagation();
        setActive(false);
        setOpen(false);
        startTransition(() => {
            if (risksRewards.some((r) => r.label === rr.label)) {
                updateEntrie({
                    userId,
                    values: { id: dealId, sheetId, rrId: rr.id },
                })
                    .then((data) => {
                        if (data.error) {
                            toast.error(data.error);
                            setActive(true);
                            setOpen(true);
                        }
                        if (data.success) {
                            toast.success(data.success);
                            setActive(false);
                            setOpen(false);
                            setCurrentRR(rr);
                            setRR("");
                        }
                    })
                    .catch(() => toast.error("Что-то пошло не так!"));
            } else {
                createRiskReward({ userId, values: rr })
                    .then((data) => {
                        if (data.error) {
                            toast.error(data.error);
                        }
                        if (data.success) {
                            toast.success(data.success);
                            setRisksRewards((prev) => [...prev, data.newRR]);
                            updateEntrie({
                                userId,
                                values: {
                                    id: dealId,
                                    sheetId,
                                    rrId: data.newRR.id,
                                },
                            })
                                .then((data) => {
                                    if (data.error) {
                                        toast.error(data.error);
                                        setActive(true);
                                        setOpen(true);
                                    }
                                    if (data.success) {
                                        toast.success(data.success);
                                        setActive(false);
                                        setOpen(false);
                                        setCurrentRR(rr);
                                        setRR("");
                                    }
                                })
                                .catch(() =>
                                    toast.error("Что-то пошло не так!")
                                );
                        }
                    })
                    .catch(() => toast.error("Что-то пошло не так!"));
            }
        });
    };

    useEffect(() => {
        if (rrId && risksRewards) {
            setCurrentRR(risksRewards.find((item) => item.id === rrId));
        }
    }, [risksRewards, rrId]);

    useEffect(() => {
        const onRR = async () => {
            const rr = await getRisksRewards();
            if (rr) {
                setRisksRewards(rr);
                setFilterRRs(rr);
            } else {
                setRisksRewards([]);
                setFilterRRs([]);
            }
            const color = getRandomHexColor();
            console.log(color);
            setLPBgColor(!rr.some((l) => l.value === color) && color);
        };
        onRR();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setActive(false);
                setOpen(false);
                setRR("");
                setFilterRRs(risksRewards);
            }
        };
        const handleScroll = () => {
            setActive(false);
            setOpen(false);
            setRR("");
            setFilterRRs(risksRewards);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [risksRewards]);

    return (
        <div
            ref={listRef}
            onClick={() => setActive(true)}
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-start relative ${
                active ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            <button
                type="button"
                disabled={isPending}
                className="flex items-center justify-between w-full"
            >
                <span
                    style={
                        currentRR
                            ? {
                                  color: determineTextColor(currentRR.value),
                                  backgroundColor: currentRR.value,
                              }
                            : null
                    }
                    className="rounded-xl px-2 overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    {currentRR?.label}
                </span>

                <Image
                    src="./arrow-down.svg"
                    alt="arrow"
                    width={10}
                    height={10}
                    style={{
                        rotate: open ? "180deg" : "0deg",
                        transition: "all .3s",
                    }}
                />
            </button>

            {active && (
                <div className="absolute left-0 top-8 z-10 w-max rounded-md py-2 bg-white border border-gray-300">
                    <input
                        type="text"
                        name="rr"
                        value={rr}
                        placeholder="Введите R:R"
                        onChange={(e) => handleChange(e.target.value)}
                        className="py-1 px-2 outline-none w-full"
                    />

                    {filterRRs.length > 0 ? (
                        <ul>
                            {filterRRs
                                .filter((t) => !rrId?.id !== t.id)
                                .map((l) => (
                                    <li
                                        key={l.label}
                                        onClick={(e) => handleSelectLP(e, l)}
                                        className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                    >
                                        <span
                                            key={l.label}
                                            style={{
                                                color: determineTextColor(
                                                    l.value
                                                ),
                                                backgroundColor: l.value,
                                            }}
                                            className="rounded-xl px-2 py-px"
                                        >
                                            {l.label}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <div className="flex items-center gap-1 px-2 text-xs">
                            Добавить R:R{" "}
                            <span
                                onClick={(e) =>
                                    handleSelectLP(e, {
                                        label: rr,
                                        value: lpBgColor,
                                    })
                                }
                                style={{
                                    color: determineTextColor(lpBgColor),
                                    backgroundColor: lpBgColor,
                                }}
                                className="rounded-xl px-2 py-px cursor-pointer"
                            >
                                {rr}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
