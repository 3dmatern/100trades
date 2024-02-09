"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EntrieSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formattedNumber";

export default function BodyCardPose({
    dealId,
    dealPose,
    dealHover,
    columnWidth,
    isPending,
    onUpdateDeal,
    isAdmin,
}) {
    const cellRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [pose, setPose] = useState("");

    const form = useForm({
        resolver: zodResolver(EntrieSchema),
        defaultValues: {
            id: dealId,
            pose: dealPose || undefined,
        },
    });

    const onSubmit = (values) => {
        if ((!values.pose && !dealPose) || values.pose === dealPose) {
            setOpen(false);
            form.reset();
            return;
        }
        onUpdateDeal(values);
    };

    const updatePose = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        const formattedPrice = formatPrice(form.getValues("pose"));
        if (formattedPrice !== "NaN") {
            setPose(formattedPrice);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (dealPose) {
            form.setValue("pose", dealPose);

            const formattedPrice = formatPrice(dealPose);
            setPose(formattedPrice);
        }
    }, [dealPose, form]);

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
                                updatePose();
                            }}
                        >
                            <FormField
                                control={form.control}
                                name="pose"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step={1}
                                                min={0}
                                                disabled={
                                                    isPending &&
                                                    isPending["pose"] &&
                                                    dealId === isPending.id
                                                }
                                                onFocus={() => setOpen(true)}
                                                onBlur={updatePose}
                                                className={`w-full h-7 px-0 pl-1 border-none text-xs outline-none overflow-hidden focus-visible:ring-0 whitespace-nowrap text-ellipsis ${
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
                        {pose}
                    </span>
                )}
            </div>
        </div>
    );
}
