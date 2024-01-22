"use client";

import React, { useState } from "react";
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
    onUpdateDeal,
}) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            risk: dealRisk || undefined,
        },
    });

    const onSubmit = (values) => {
        if (values.risk === dealRisk) {
            setOpen(false);
            form.reset();
            return;
        }
        onUpdateDeal(values);
    };

    const updateRisk = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    return (
        <div className="table-cell align-middle h-full">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center w-full h-full relative text-xs ${
                    selectedDeals?.includes(dealId) || dealHover
                        ? "bg-slate-50"
                        : "bg-white"
                } ${open ? "border border-blue-800" : "border-r"}`}
            >
                <span className="absolute top-auto right-2">%</span>
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
                                            onFocus={() => setOpen(true)}
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
            </div>
        </div>
    );
}
