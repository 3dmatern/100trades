"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EntrieSchema } from "@/schemas";
import { updateEntrie } from "@/actions/entrie";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckboxOrNumber from "@/components/ui/deals/common/checkboxOrNumber";

export default function BodyCardName({
    userId,
    sheetId,
    index,
    dealId,
    dealName,
    selectedDeals,
    checkAll,
    dealHover,
    columnWidth,
    onCheckDeal,
}) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            sheetId,
            name: dealName || undefined,
        },
    });

    const onSubmit = (values) => {
        if (!values.name && !dealName) {
            setOpen(false);
            form.reset();
            return;
        }
        startTransition(() => {
            updateEntrie({ userId, values })
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        setOpen(false);
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    const updateName = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    return (
        <div className="table-cell sticky left-0 z-[1]">
            <div
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center pl-8 overflow-hidden ${
                    open ? "border border-blue-800" : "border-r"
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
                    className="size-7 absolute top-1/2 left-0 -translate-y-1/2"
                />

                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="AAAA"
                                            onFocus={() => setOpen(true)}
                                            onBlur={updateName}
                                            className={`w-20 h-8 px-2 text-xs border-none outline-none focus-visible:ring-0 overflow-hidden whitespace-nowrap text-ellipsis ${
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
