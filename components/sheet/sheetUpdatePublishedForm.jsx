"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SheetPublishedSchema } from "@/schemas";
import {
    updateSheetPublished,
    getSheetPublishedBySheetId,
} from "@/actions/sheetPublished";
import { ITEMS } from "@/components/sheet/constants";

export default function SheetUpdatePublishedForm({
    userId,
    sheetId,
    setIsPublished,
    setSheetPublishedId,
}) {
    const form = useForm({
        resolver: zodResolver(SheetPublishedSchema),
        defaultValues: {
            userId,
            sheetId,
        },
    });

    const onSubmit = async (values) => {
        try {
            const data = await updateSheetPublished(values);
            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                const { updSheetPublished, success } = data;
                toast.success(success);
                setSheetPublishedId(updSheetPublished.id);
                setValueForm(updSheetPublished);
                setIsPublished(true);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Что-то пошло не так при обновлении параметров!");
        }
    };

    const setValueForm = (data) => {
        delete data.date;
        delete data.id;
        delete data.userId;
        delete data.sheetId;
        const fields = Object.values(data).filter((d) => d !== null);
        form.setValue("items", fields);
    };

    useEffect(() => {
        const sheetPublished = async () => {
            const data = await getSheetPublishedBySheetId(sheetId);
            if (data) {
                if (data?.error) {
                    setIsPublished(false);
                } else {
                    setSheetPublishedId(data.id);
                    setValueForm(data);
                    setIsPublished(true);
                }
            }
        };

        sheetPublished();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheetId]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <>
                            <div className="mb-4">
                                <FormLabel className="text-base">
                                    Обновить настройки публичности
                                </FormLabel>
                                <FormDescription>
                                    Снимите галочку с полей, которые не хотите
                                    отображать.
                                </FormDescription>
                            </div>
                            <FormItem className="grid lg:grid-cols-4 grid-cols-3 gap-1 space-y-0">
                                {ITEMS.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                item.id
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              item.id,
                                                                          ]
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value
                                                                              ) =>
                                                                                  value !==
                                                                                  item.id
                                                                          )
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                            </FormItem>
                            <FormMessage className="text-center" />
                        </>
                    )}
                />

                <Button type="submit" className="h-8">
                    Обновить
                </Button>
            </form>
        </Form>
    );
}
