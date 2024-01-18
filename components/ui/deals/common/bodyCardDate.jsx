"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EntrieSchema } from "@/schemas";
import { updateEntrie } from "@/actions/entrie";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { dealDateWithTime } from "@/utils/formatedDate";

export default function BodyCardDate({
    userId,
    sheetId,
    dealId,
    name,
    dealDate,
    minDate,
    maxDate,
    disabled,
    onChangeDate,
    columnWidth,
}) {
    const cellRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            sheetId,
            [name]: dealDate || undefined,
        },
    });
    const onSubmit = (values) => {
        if (values[name] === dealDate) {
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

    const updateDate = () => {
        const newDate = form.getValues(name);
        if (newDate) {
            setDate(dealDateWithTime(newDate));
        } else {
            setDate("");
        }
        onChangeDate(newDate);
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    useEffect(() => {
        if (dealDate) {
            form.setValue(name, dealDate);
            setDate(dealDateWithTime(dealDate));
        }
    }, [dealDate, form, name]);

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
                onClick={() => setOpen(true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center justify-center h-full text-xs overflow-hidden ${
                    open ? "border border-blue-800" : "border-r px-2"
                }`}
            >
                {open ? (
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="datetime-local"
                                                min={minDate}
                                                max={maxDate}
                                                onBlur={updateDate}
                                                disabled={
                                                    disabled
                                                        ? disabled
                                                        : isPending
                                                }
                                                style={{
                                                    width: columnWidth,
                                                    minWidth: "64px",
                                                }}
                                                className={`h-8 py-0 px-2 text-xs outline-none border-none focus-visible:ring-0`}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                ) : (
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
                        {date}
                    </span>
                )}
            </div>
        </div>
    );
}
