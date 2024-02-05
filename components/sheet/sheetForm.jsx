"use client";

import { useState } from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { SheetUpdateSchema } from "@/schemas";
import { updateSheet } from "@/actions/sheet";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SheetForm({ sheet, userId, onUpdateSheet }) {
    const [isPending, setIsPending] = useState(false);

    const form = useForm({
        resolver: zodResolver(SheetUpdateSchema),
        defaultValues: {
            id: sheet.id,
            userId,
            name: sheet.name,
        },
    });

    const onSubmit = async (values) => {
        if (!values.name || values.name === sheet.name) {
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
            }
        } catch (error) {
            toast.error("Что-то пошло не так при обновлении листа!");
        }
        setIsPending(false);
    };

    const handleUpdateSheet = () => {
        onSubmit(form.getValues());
    };

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateSheet();
                }}
                className="flex items-center justify-center h-9 px-2 relative"
            >
                {isPending ? (
                    <BeatLoader size={10} />
                ) : (
                    <div className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onBlur={handleUpdateSheet}
                                            disabled={isPending}
                                            placeholder="Лист 1"
                                            className="bg-white h-8 max-w-24"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="size-8 p-0">
                            <Image
                                src="/done.svg"
                                alt="Изменить название"
                                width={16}
                                height={16}
                            />
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
}
