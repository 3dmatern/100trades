"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/cardWrapper";
import { FormSuccess } from "@/components/formSuccess";
import { FormError } from "@/components/formError";
import { newPassword } from "@/actions/newPassword";

export function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values) => {
        setSuccess("");
        setError("");

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Введите новый пароль"
            backButtonLabel="Вернуться на страницу входа"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Новый пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="password"
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
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        Изменить пароль
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
