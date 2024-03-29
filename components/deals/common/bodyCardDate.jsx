"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { dealDateWithTime } from "@/utils/formatedDate";

export default function BodyCardDate({
    dealId,
    inputName,
    dealDate,
    minDate,
    maxDate,
    columnWidth,
    isPending,
    disabled,
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
            [inputName]: dealDate,
        },
    });

    const onSubmit = (values) => {
        if (values[inputName] === dealDate) {
            setOpen(false);
            return;
        }
        onActionDeal(values);
    };

    const updateDate = () => {
        form.handleSubmit(onSubmit(form.getValues()));
        form.reset();
        setOpen(false);
    };

    useEffect(() => {
        if (dealDate) {
            form.setValue(inputName, dealDate);
        }
    }, [dealDate, form, inputName]);

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
                    open && !isAdmin && !isPublished
                        ? "border border-blue-800"
                        : "border-r px-2"
                }`}
            >
                {open && !isAdmin && !isPublished ? (
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name={inputName}
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
                                                        : isPending &&
                                                          isPending[
                                                              inputName
                                                          ] &&
                                                          dealId ===
                                                              isPending.id
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
                        {dealDate && dealDateWithTime(dealDate)}
                    </span>
                )}
            </div>
        </div>
    );
}
