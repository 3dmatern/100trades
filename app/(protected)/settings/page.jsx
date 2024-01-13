"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
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
            firstname: user.firstname || undefined,
            lastname: user.lastname || undefined,
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
        <main className="w-full h-full md:flex items-start justify-center gap-8 mt-8">
            <Card className="max-w-[600px] w-full">
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
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Имя</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Джон"
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
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Фамилия</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Доу"
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
        </main>
    );
}
