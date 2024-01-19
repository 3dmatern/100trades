"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckboxOrNumber from "@/components/ui/deals/common/checkboxOrNumber";

export default function BodyCardName({
    index,
    dealId,
    dealName,
    selectedDeals,
    checkAll,
    dealHover,
    columnWidth,
    onCheckDeal,
    isPending,
    onUpdateDeal,
}) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            name: dealName || undefined,
        },
    });

    const onSubmit = (values) => {
        if (!values.name && !dealName) {
            setOpen(false);
            form.reset();
            return;
        }
        onUpdateDeal(values);
    };

    const updateName = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    return (
        <div className="table-cell align-middle h-full sticky left-0 z-[1]">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center h-full pl-7 pr-2 ${
                    open
                        ? "border border-blue-800"
                        : "border-l border-r border-slate-300"
                } ${
                    selectedDeals?.includes(dealId) || dealHover
                        ? "bg-slate-50"
                        : "bg-white"
                }`}
            >
                <CheckboxOrNumber
                    number={index + 1}
                    name="deals"
                    value={dealId}
                    checked={selectedDeals?.includes(dealId)}
                    checkAll={checkAll}
                    onChange={onCheckDeal}
                    className="size-7 absolute top-1/2 left-[2px] -translate-y-1/2"
                />

                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={
                                                isPending &&
                                                isPending["name"] &&
                                                dealId === isPending.id
                                            }
                                            placeholder="AAAA"
                                            onFocus={() => setOpen(true)}
                                            onBlur={updateName}
                                            className={`h-7 p-0 pl-1 text-xs border-none outline-none shadow-none focus-visible:ring-0 overflow-hidden whitespace-nowrap text-ellipsis ${
                                                selectedDeals?.includes(
                                                    dealId
                                                ) || dealHover
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
