"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { createRiskReward } from "@/actions/riskReward";
import { getRandomHexColor } from "@/utils/getRandomHexColor";
import { updateEntrie } from "@/actions/entrie";

export default function BodyCardRR({
    userId,
    sheetId,
    dealId,
    rrId,
    risksRewards,
    columnWidth,
    determineTextColor,
}) {
    const listRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [filterRRs, setFilterRRs] = useState([]);
    const [lpBgColor, setLPBgColor] = useState("");
    const [currentRR, setCurrentRR] = useState(undefined);
    const [rr, setRR] = useState("");

    const handleChange = (value) => {
        setRR(value);
        setFilterRRs(risksRewards.filter((r) => r.label.includes(value)));
    };

    const handleSelectRR = async (e, rr) => {
        e.stopPropagation();
        setActive(false);
        setOpen(false);

        let selectRR = rr;
        if (!selectRR.id) {
            const { newRR, success, error } = await createRiskReward({
                userId,
                values: rr,
            });
            if (error) {
                toast.error(error);
                return;
            } else {
                toast.success(success);
                selectRR = newRR;
                setRR("");
            }
        }
        setCurrentRR(selectRR);

        startTransition(() => {
            updateEntrie({
                userId,
                values: { id: dealId, sheetId, rrId: selectRR.id },
            }).then((data) => {
                if (data.error) {
                    toast.error(data.error);
                }
                if (data.success) {
                    toast.success(data.success);
                }
            });
        });
    };

    useEffect(() => {
        if (rrId && risksRewards) {
            setCurrentRR(risksRewards.find((item) => item.id === rrId));
        }
    }, [risksRewards, rrId]);

    useEffect(() => {
        if (risksRewards) {
            setFilterRRs(risksRewards);
            const color = getRandomHexColor();
            setLPBgColor(!risksRewards.some((l) => l.value === color) && color);
        }
    }, [risksRewards]);

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
        <div className="table-cell align-middle h-full">
            <div
                ref={listRef}
                onClick={() => setActive(true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center h-full px-2 relative text-xs ${
                    active ? "border border-blue-800" : "border-r"
                }`}
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
                                      color: determineTextColor(
                                          currentRR.value
                                      ),
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
                                    .map((rr) => (
                                        <li
                                            key={rr.label}
                                            onClick={(e) =>
                                                handleSelectRR(e, rr)
                                            }
                                            className="flex items-center justify-start h-8 px-2 hover:bg-slate-200 cursor-pointer"
                                        >
                                            <span
                                                key={rr.label}
                                                style={{
                                                    color: determineTextColor(
                                                        rr.value
                                                    ),
                                                    backgroundColor: rr.value,
                                                }}
                                                className="rounded-xl px-2 py-px"
                                            >
                                                {rr.label}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <div className="flex items-center gap-1 px-2 text-xs">
                                Добавить R:R{" "}
                                <span
                                    onClick={(e) =>
                                        handleSelectRR(e, {
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
        </div>
    );
}
