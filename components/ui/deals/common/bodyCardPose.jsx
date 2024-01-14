"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

import { EntrieSchema } from "@/schemas";
import { updateEntrie } from "@/actions/entrie";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function BodyCardPose({
    userId,
    sheetId,
    dealId,
    dealPose,
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
            pose: dealPose || undefined,
        },
    });

    const onSubmit = (values) => {
        if (!values.pose && !dealPose) {
            setOpen(false);
            form.reset();
            return;
        }
        startTransition(() => {
            updateEntrie({
                userId,
                values,
            })
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        setOpen(false);
                        toast.success(data.success);
                        // form.setValue("pose", data.updatedEntrie.pose);
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    const updatePose = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    return (
        <div
            style={{ width: columnWidth, minWidth: "64px" }}
            className={`flex items-center justify-center relative ${
                open ? "border border-blue-800" : "border-r"
            } h-8 px-2 text-xs`}
        >
            <span className="absolute top-auto left-1">₽</span>
            <Form {...form}>
                <form>
                    {isPending ? (
                        <div className="w-full h-8 pl-2 flex items-center justify-center">
                            <BeatLoader size={8} />
                        </div>
                    ) : (
                        <FormField
                            control={form.control}
                            name="pose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            onFocus={() => setOpen(true)}
                                            onBlur={updatePose}
                                            className={`h-8 ml-2 border-none text-xs w-full outline-none overflow-hidden whitespace-nowrap text-ellipsis ${
                                                dealHover
                                                    ? "bg-slate-50"
                                                    : "bg-white"
                                            }`}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}
                </form>
            </Form>
        </div>
    );
}
