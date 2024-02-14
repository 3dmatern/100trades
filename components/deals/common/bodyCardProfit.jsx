"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BodyCardProfit({
    dealId,
    dealProfit,
    dealHover,
    selectedDeals,
    columnWidth,
    isPending,
    onActionDeal,
    isAdmin,
    isPublished,
}) {
    const cellRef = useRef(null);
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            profit: dealProfit || undefined,
        },
    });

    const handleOpen = () => {
        setOpen((prev) => true);
        form.setValue("id", dealId);
        form.setValue("profit", dealProfit);
    };

    const onSubmit = (values) => {
        if ((!values.profit && !dealProfit) || values.profit === dealProfit) {
            setOpen((prev) => false);
            return;
        }
        onActionDeal(values);
    };

    const updateProfit = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        form.reset({ id: "", profit: "" });
        setOpen((prev) => false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cellRef.current && !cellRef.current.contains(e.target)) {
                setOpen((prev) => false);
            }
        };
        const handleScroll = () => {
            setOpen((prev) => false);
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
                } ${
                    open && !isAdmin && !isPublished
                        ? "border border-blue-800"
                        : "border-r"
                }`}
            >
                <span className="absolute top-auto right-2">%</span>
                {open && !isAdmin && !isPublished ? (
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateProfit();
                            }}
                        >
                            <FormField
                                control={form.control}
                                name="profit"
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
                                                    isPending["profit"] &&
                                                    dealId === isPending.id
                                                }
                                                onBlur={updateProfit}
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
                        {dealProfit}
                    </span>
                )}
            </div>
        </div>
    );
}
