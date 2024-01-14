"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";

import { SheetCreateSchema } from "@/schemas";
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
    const sheetsRef = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [sheetId, setSheetId] = useState("");

    const form = useForm({
        resolver: zodResolver(SheetCreateSchema),
        defaultValues: {
            userId,
            name: "",
        },
    });

    const onSubmit = (values) => {
        if (!values.name) {
            setOpen(false);
            form.reset();
            return;
        }
        startTransition(() => {
            createSheet(values)
                .then((data) => {
                    if (data.error) {
                        setOpen(true);
                        toast.error(data.error);
                    }
                    if (data.success) {
                        setOpen(false);
                        toast.success(data.success);
                        form.reset();
                    }
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    };

    useEffect(() => {
        if (sheets.length > 0) {
            setSheetId(sheets[0].id);
        }
    }, [sheets]);

    useEffect(() => {
        const handleClickOutside = async (e) => {
            if (
                sheetsRef.current &&
                !sheetsRef.current.contains(e.target) &&
                open
            ) {
                form.handleSubmit(onSubmit(form.getValues()));
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, open]);

    return (
        <div ref={sheetsRef} className={className}>
            <div className="flex items-center justify-start gap-1 h-9">
                {sheets.length > 0 &&
                    sheets?.map((sheet, index) => (
                        <Sheet
                            key={sheet.id}
                            selectSheet={sheetId}
                            sheet={sheet}
                            userId={userId}
                            onClickId={setSheetId}
                            className={
                                sheetId === index
                                    ? "bg-gray-100"
                                    : "bg-gray-200"
                            }
                        />
                    ))}
                {(open || isPending) && (
                    <Form {...form}>
                        <form className="flex items-center justify-center h-9 px-2 relative bg-gray-200 rounded-t-lg">
                            {isPending ? (
                                <BeatLoader size={10} />
                            ) : (
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
                            )}
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
            <Table userId={userId} sheetId={sheetId} />
        </div>
    );
}
