"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

import { EntrieSchema } from "@/schemas";
import { updateEntrie } from "@/actions/entrie";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BodyCardProfit({
    userId,
    sheetId,
    dealId,
    dealProfit,
    dealHover,
    columnWidth,
}) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            sheetId,
            profit: dealProfit || undefined,
        },
    });

    const onSubmit = (values) => {
        if (values.risk === dealProfit) {
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
                        // form.setValue("name", data.updatedEntrie.name);
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    const updateProfit = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center relative h-8 text-xs ${
                open ? "border border-blue-800" : "border-r"
            }`}
        >
            {isPending ? (
                <div className="w-full h-8 flex items-center justify-center">
                    <BeatLoader size={8} />
                </div>
            ) : (
                <>
                    <span className="absolute top-auto right-2">%</span>
                    <Form {...form}>
                        <form>
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
                                                disabled={isPending}
                                                onFocus={() => setOpen(true)}
                                                onBlur={updateProfit}
                                                className={`w-full h-8 pr-4 text-xs border-none text-start outline-none overflow-hidden whitespace-nowrap text-ellipsis ${
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
                </>
            )}
        </div>
    );
}
