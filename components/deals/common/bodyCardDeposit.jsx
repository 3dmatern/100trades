"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formattedNumber";

export default function BodyCardDeposit({
    dealId,
    dealDeposit,
    dealHover,
    columnWidth,
    isPending,
    onUpdateDeal,
    isAdmin,
}) {
    const cellRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [deposit, setDeposit] = useState("");

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            deposit: dealDeposit || undefined,
        },
    });

    const onSubmit = (values) => {
        if (
            (!values.deposit && !dealDeposit) ||
            values.deposit === dealDeposit ||
            parseFloat(values.deposit) === 0
        ) {
            setOpen(false);
            form.reset();
            return;
        }
        onUpdateDeal(values);
    };

    const updateDeposit = () => {
        form.handleSubmit(onSubmit(form.getValues()));
        const formattedPrice = formatPrice(form.getValues("deposit"));

        setDeposit(formattedPrice);
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
                    open && !isAdmin ? "border border-blue-800" : "border-r"
                }`}
            >
                <span>₽</span>
                {open && !isAdmin ? (
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateDeposit();
                            }}
                        >
                            <FormField
                                control={form.control}
                                name="deposit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step={1}
                                                min={0}
                                                onFocus={() => setOpen(true)}
                                                onBlur={updateDeposit}
                                                disabled={
                                                    isPending &&
                                                    isPending["deposit"] &&
                                                    dealId === isPending.id
                                                }
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
