"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";

import { UiContainer } from "@/components/uikit/uiContainer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/formSuccess";
import { FormError } from "@/components/formError";

export default function SettingsPage() {
    const user = useCurrentUser();

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const form = useForm({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            nickname: user.nickname || undefined,
            password: undefined,
            newPassword: undefined,
        },
    });

    function onSubmit(values) {
        setSuccess("");
        setError("");

        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }

                    if (data.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Что-то пошло не так!"));
        });
    }

    return (
        <UiContainer className="px-5 flex items-center justify-center">
            <Card className="max-w-[600px] min-w-80 w-full">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Настройки профиля
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="nickname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Псевдоним</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    disabled={isPending}
                                                    placeholder="bestTrader"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Пароль</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Новый пароль</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSuccess message={success} />
                            <FormError message={error} />
                            <Button type="submit" disabled={isPending}>
                                Сохранить
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </UiContainer>
    );
}
