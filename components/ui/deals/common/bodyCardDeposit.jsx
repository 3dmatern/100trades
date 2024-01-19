"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EntrieSchema } from "@/schemas";
import { updateEntrie } from "@/actions/entrie";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formattedNumber";

export default function BodyCardDeposit({
    userId,
    sheetId,
    dealId,
    dealDeposit,
    dealHover,
    columnWidth,
    onChangeDeal,
}) {
    const cellRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [deposit, setDeposit] = useState("");

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            sheetId,
            deposit: dealDeposit || undefined,
        },
    });

    const onSubmit = (values) => {
        if (
            (!values.deposit && !dealDeposit) ||
            values.deposit === dealDeposit
        ) {
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
                        onChangeDeal({
                            id: dealId,
                            name: "deposit",
                            value: values.deposit,
                        });
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    const updateDeposit = () => {
        form.handleSubmit(onSubmit(form.getValues()));
        const formattedPrice = formatPrice(form.getValues("deposit"));
        if (formattedPrice !== "NaN") {
            setDeposit(formattedPrice);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (dealDeposit) {
            form.setValue("deposit", dealDeposit);

            const formattedPrice = formatPrice(dealDeposit);
            setDeposit(formattedPrice);
        }
    }, [dealDeposit, form]);

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
                className={`flex items-center w-full h-full px-2 relative text-xs ${
                    open ? "border border-blue-800" : "border-r"
                }`}
            >
                <span>₽</span>
                {open ? (
                    <Form {...form}>
                        <form>
                            <FormField
                                control={form.control}
                                name="deposit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step={0.01}
                                                min={0}
                                                onFocus={() => setOpen(true)}
                                                onBlur={updateDeposit}
                                                disabled={isPending}
                                                className={`w-full h-7 px-0 pl-1 border-none text-xs outline-none focus-visible:ring-0 overflow-hidden whitespace-nowrap text-ellipsis ${
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
                    <span className="pl-1 overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none">
                        {deposit}
                    </span>
                )}
            </div>
        </div>
    );
}
