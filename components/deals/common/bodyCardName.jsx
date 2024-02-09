"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckboxOrNumber from "@/components/deals/common/checkboxOrNumber";

export default function BodyCardName({
    index,
    dealId,
    dealName,
    selectedDeals,
    dealHover,
    columnWidth,
    onCheckDeal,
    isPending,
    onUpdateDeal,
    isAdmin,
}) {
    const cellRef = useRef(null);
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
        <div className="table-cell align-middle h-full sticky left-0 z-[2]">
            <div
                ref={cellRef}
                onClick={() => setOpen(true)}
                style={{ width: columnWidth, minWidth: "64px" }}
                className={`flex items-center h-full pl-7 pr-2 ${
                    open && !isAdmin
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
                    onChange={onCheckDeal}
                    isAdmin={isAdmin}
                    className="size-7 absolute top-1/2 left-[2px] -translate-y-1/2"
                />

                {open && !isAdmin ? (
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateName();
                            }}
                        >
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
                ) : (
                    <span
                        className={`flex items-center justify-start h-7 p-0 pl-1 text-xs ${
                            !dealName && "text-gray-500"
                        } overflow-hidden whitespace-nowrap text-ellipsis pointer-events-none`}
                    >
                        {dealName || "AAAA"}
                    </span>
                )}
            </div>
        </div>
    );
}
