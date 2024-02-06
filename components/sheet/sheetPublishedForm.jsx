"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

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
    createSheetPublished,
    deleteSheetPublished,
    getSheetPublishedBySheetId,
} from "@/actions/sheetPublished";
import { useRouter } from "next/navigation";
import CopyableLink from "../copyableLink";

const items = [
    { id: "name", label: "Тикер" },
    { id: "resultId", label: "WIN-LOSS" },
    { id: "pose", label: "Поза" },
    { id: "risk", label: "Риск" },
    { id: "profit", label: "Профит" },
    { id: "rrId", label: "R:R" },
    { id: "entryDate", label: "Вход" },
    { id: "imageStart", label: "СКРИН" },
    { id: "deposit", label: "Депозит" },
    { id: "progress", label: "Прогресс" },
    { id: "exitDate", label: "Выход" },
    { id: "imageEnd", label: "Скрин 2" },
    { id: "take", label: "Пора?" },
    { id: "stress", label: "Стресс" },
    { id: "entrieTag", label: "Теги" },
    { id: "notes", label: "Заметки" },
    { id: "timeInTrade", label: "Время в сделке" },
];

export default function SheetPublishedForm({ userId, sheetId }) {
    const router = useRouter();
    const [isPublished, setIsPublished] = useState(false);
    const [sheetPublishedId, setSheetPublishedId] = useState("");

    const form = useForm({
        resolver: zodResolver(SheetPublishedSchema),
        defaultValues: {
            userId,
            sheetId,
            items: [
                "name",
                "pose",
                "risk",
                "profit",
                "entryDate",
                "imageStart",
                "deposit",
                "progress",
                "exitDate",
                "imageEnd",
                "take",
                "stress",
                "notes",
                "timeInTrade",
                "resultId",
                "rrId",
                "entrieTag",
            ],
        },
    });

    const onSubmit = async (values) => {
        try {
            const data = await createSheetPublished(values);
            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                const { newSheetPublished, success } = data;
                toast.success(success);
                setSheetPublishedId(newSheetPublished.id);
                setIsPublished(true);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Что-то пошло не так при публикации листа!");
        }
    };

    const handleDelete = async () => {
        try {
            const data = await deleteSheetPublished(sheetPublishedId, userId);
            if (data.error) {
                toast.error(data.error);
            } else if (data.success) {
                toast.success(data.success);
                setSheetPublishedId("");
                setIsPublished(false);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(
                "Что-то пошло не так при удалении листа из публикации!"
            );
        }
    };

    useEffect(() => {
        const sheetPublished = async () => {
            const data = await getSheetPublishedBySheetId(sheetId);
            if (data) {
                if (data?.error) {
                    setIsPublished(false);
                } else {
                    setSheetPublishedId(data.id);
                    setIsPublished(true);
                }
            }
        };

        sheetPublished();
    }, [sheetId]);

    return isPublished ? (
        <>
            <CopyableLink
                linkToCopy={`${process.env.NEXT_PUBLIC_APP_URL}/published?id=${sheetPublishedId}`}
            />

            <Button
                type="button"
                onClick={handleDelete}
                className="w-max mx-auto h-8"
            >
                Удалить из публикации
            </Button>
        </>
    ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <>
                            <div className="mb-4">
                                <FormLabel className="text-base">
                                    Настройки публичности
                                </FormLabel>
                                <FormDescription>
                                    Снимите галочку с полей, которые не хотите
                                    отображать.
                                </FormDescription>
                            </div>
                            <FormItem className="grid lg:grid-cols-4 grid-cols-3 gap-1 space-y-0">
                                {items.map((item) => (
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
                    Опубликовать
                </Button>
            </form>
        </Form>
    );
}
