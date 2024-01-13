"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { SheetSchema } from "@/schemas";
import { createSheet } from "@/actions/sheet";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sheet from "@/components/ui/deals/sheet";
import Table from "@/components/ui/deals/table";

export default function Sheets({ className, userId, sheets }) {
    const sheetRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [sheetId, setSheetId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm({
        resolver: zodResolver(SheetSchema),
        defaultValues: {
            userId,
            name: "",
        },
    });

    const onSubmit = (values) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createSheet(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
                .catch(() => setError("Что-то пошло не так!"));
        });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sheetRef.current &&
                !sheetRef.current.contains(e.target) &&
                open
            ) {
                form.handleSubmit(onSubmit(form.getValues()));
                setOpen(false);
                form.formState.defaultValues.name = "";
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [form, open]);

    return (
        <div ref={sheetRef} className={className}>
            <div className="flex items-center justify-start gap-1 h-9">
                {sheets &&
                    sheets?.map((sheet, index) => (
                        <Sheet
                            key={sheet.id}
                            index={index}
                            selectSheet={sheetId}
                            sheet={sheet}
                            onClickIndex={setSheetId}
                            className={
                                sheetId === index
                                    ? "bg-gray-100"
                                    : "bg-gray-200"
                            }
                        />
                    ))}
                {open && (
                    <Form {...form}>
                        <form className="flex items-center justify-center h-9 px-2 relative bg-gray-200 rounded-t-lg">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Лист 1"
                                                    className="bg-white h-8 max-w-24"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                )}
                <Button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center size-9 p-1 rounded-sm bg-slate-100 hover:bg-slate-200"
                >
                    <Image
                        src="./plus-lg.svg"
                        alt="plus"
                        width={16}
                        height={16}
                    />
                </Button>
            </div>
            <Table sheetId={sheetId} />
        </div>
    );
}
