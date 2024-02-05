"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function SheetAddButton({
    className,
    classNameBtn,
    userId,
    onOpenForm,
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [newSheet, setNewSheet] = useState(null);

    const handleOpenForm = () => {
        setOpen(true);
        if (onOpenForm) {
            onOpenForm(true);
        }
    };

    const handleClose = () => {
        form.reset();
        setOpen(false);
    };

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
                        setNewSheet(data.newSheet);
                    }
                })
                .catch(() =>
                    toast.error("Что-то пошло не так при создании листа!")
                );
        });
    };

    const onCreateSheet = async () => {
        form.handleSubmit(onSubmit(form.getValues()));
        setOpen(false);
    };

    useEffect(() => {
        if (newSheet) {
            router.push(`/sheets/${newSheet.id}`);
        }
    }, [newSheet, router]);

    return (
        <>
            {(open || isPending) && (
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onCreateSheet();
                        }}
                        className={cn(
                            "flex items-center justify-center h-9 px-2 relative bg-gray-200 rounded-t-lg",
                            className
                        )}
                    >
                        {isPending ? (
                            <BeatLoader size={10} />
                        ) : (
                            <div className="space-y-4 pr-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onBlur={onCreateSheet}
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
                        {!isPending && (
                            <div
                                onClick={handleClose}
                                className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer"
                            >
                                <Image
                                    src="/removeSheet.svg"
                                    alt="close"
                                    width={14}
                                    height={14}
                                />
                            </div>
                        )}
                    </form>
                </Form>
            )}
            <Button
                type="button"
                onClick={handleOpenForm}
                className={cn(
                    "flex items-center justify-center size-8 p-1 rounded-sm bg-slate-100 hover:bg-slate-200",
                    classNameBtn
                )}
            >
                <Image src="/plus-lg.svg" alt="plus" width={16} height={16} />
            </Button>
        </>
    );
}
