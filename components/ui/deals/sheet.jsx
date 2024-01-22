"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { SheetUpdateSchema } from "@/schemas";
import { updateSheet } from "@/actions/sheet";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Sheet({
    className,
    selectSheet,
    sheet,
    userId,
    onAddSheetRef,
    onUpdateSheet,
    onRemoveSheet,
}) {
    const sheetRef = useRef(null);
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [isPendingRemove, setIsPendingRemove] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(SheetUpdateSchema),
        defaultValues: {
            id: sheet.id,
            userId,
            name: sheet.name,
        },
    });

    const handleRemoveSheet = (e, sheetId) => {
        e.stopPropagation();
        setIsPendingRemove(true);
        onRemoveSheet(sheetId);
        setIsPendingRemove(false);
    };

    const onSubmit = async (values) => {
        if (!values.name || values.name === sheet.name) {
            setOpen(false);
            form.reset();
            return;
        }
        try {
            setIsPending(true);
            const data = await updateSheet(values);

            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                const { payload, success } = data;
                toast.success(success);
                onUpdateSheet({
                    sheetId: values.id,
                    updName: values.name,
                });
                setOpen(false);
            }
        } catch (error) {
            toast.error("Что-то пошло не так при обновлении листа!");
        }
        setIsPending(false);
    };

    const handleUpdateSheet = async () => {
        await onSubmit(form.getValues());
        setOpen(false);
    };

    useEffect(() => {
        const list = sheetRef.current;
        if (sheet && list) {
            const offsetLeft = list.offsetLeft;
            onAddSheetRef((prev) => [...prev, { id: sheet.id, offsetLeft }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheet, sheetRef]);

    return (
        <div
            ref={sheetRef}
            id={sheet.id}
            onClick={() => router.push(`/sheets/${sheet.id}`)}
            className={cn(
                `flex items-center justify-center gap-1 w-max h-9 px-2 relative hover:bg-gray-100 rounded-t-lg cursor-pointer ${
                    sheet.id === selectSheet ? "pr-6" : ""
                }`,
                className
            )}
        >
            {isPendingRemove ? (
                <BeatLoader size={10} />
            ) : (
                <>
                    {open ? (
                        <Form {...form}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdateSheet();
                                }}
                                className="flex items-center justify-center h-9 px-2 relative bg-gray-200 rounded-t-lg"
                            >
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
                                                            onBlur={
                                                                handleUpdateSheet
                                                            }
                                                            disabled={isPending}
                                                            placeholder="Лист 1"
                                                            className="bg-white h-8 max-w-24"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </form>
                        </Form>
                    ) : (
                        <span>{sheet.name}</span>
                    )}

                    {sheet.id === selectSheet && (
                        <>
                            {!open && (
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        handleRemoveSheet(e, sheet.id)
                                    }
                                    className="absolute top-1 right-1.5 cursor-pointer hover:scale-110"
                                >
                                    <Image
                                        src="/removeSheet.svg"
                                        alt="remove"
                                        width={10}
                                        height={10}
                                        className="pointer-events-none"
                                    />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="absolute bottom-1 right-1.5 cursor-pointer hover:scale-110"
                            >
                                <Image
                                    src="/pencil.svg"
                                    alt="edit"
                                    width={10}
                                    height={10}
                                    className="pointer-events-none"
                                />
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
