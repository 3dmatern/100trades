"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export function RegisterForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values) => {
        setSuccess("");
        setError("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
                .catch(() => setError("Что-то пошло не так!"));
        });
    };

    return (
        <CardWrapper
            headerLabel="Создать аккаунт"
            backButtonLabel="Уже есть аккаунта?"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            placeholder="jhon.doe@example.com"
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
                        Создать аккаунт
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
