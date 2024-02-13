"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BodyCardRisk({
    dealId,
    dealRisk,
    dealHover,
    selectedDeals,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
}) {
    const cellRef = useRef(null);
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            risk: dealRisk || undefined,
        },
    });

    const handleOpen = () => {
        setOpen((prev) => true);
        form.setValue("id", dealId);
        form.setValue("risk", dealRisk);
    };

    const onSubmit = (values) => {
        if ((!values.risk && !dealRisk) || values.risk === dealRisk) {
            setOpen((prev) => false);
            return;
        }
        onActionDeal(values);
    };

    const updateRisk = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        form.reset({ id: "", risk: "" });
        setOpen((prev) => false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cellRef.current && !cellRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const handleScroll = () => {
            setOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="table-cell align-middle h-full">
            <div
                ref={cellRef}
                onClick={handleOpen}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center w-full h-full relative text-xs ${
                    selectedDeals?.includes(dealId) || dealHover
                        ? "bg-slate-50"
                        : "bg-white"
                } ${open && !isAdmin ? "border border-blue-800" : "border-r"}`}
            >
                <span className="absolute top-auto right-2">%</span>
                {open && !isAdmin ? (
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateRisk();
                            }}
                        >
                            <FormField
                                control={form.control}
                                name="risk"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.10"
                                                max={100.0}
                                                min={0.0}
                                                disabled={
                                                    isPending &&
                                                    isPending["risk"] &&
                                                    dealId === isPending.id
                                                }
                                                onBlur={updateRisk}
                                                className={`w-full h-7 pr-4 text-xs border-none text-start outline-none shadow-none focus-visible:ring-0 overflow-hidden whitespace-nowrap text-ellipsis ${
                                                    dealHover
                                                        ? "bg-slate-50"
                                                        : "bg-white"
                                                }`}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                ) : (
                    <span className="w-full pl-2 px-5 text-start overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
                        {dealRisk}
                    </span>
                )}
            </div>
        </div>
    );
}
