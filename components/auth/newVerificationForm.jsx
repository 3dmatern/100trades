"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/newVerification";
import { CardWrapper } from "@/components/auth/cardWrapper";
import { FormSuccess } from "@/components/formSuccess";
import { FormError } from "@/components/formError";

export function NewVerificationForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Отсутствует токен!");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Что-то пошло не так!");
            });
    }, [error, success, token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Ваш email успешно подтвержден"
            backButtonLabel="Вернуться на страницу входа"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success} />
                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
}
