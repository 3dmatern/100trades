"use client"

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { uploadLogoImage } from "@/actions/uploadLogoImage";
import { Button } from "../ui/button";
import { FormSuccess } from "../formSuccess";
import { FormError } from "../formError";

export function UploadLogoImage() {
    const formRef = useRef(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleAction = async (formData) => {
        try {
            await uploadLogoImage(formData);
            setSuccess(prev => "Логотип изменен, перезагрузите страницу.");
        } catch (error) {
            console.error(error);
            setError(prev => "Ошибка при изменении логотипа, обратитесь к разработчику.");
        }
        formRef.current.reset();
    };

    return (
        <form
            ref={formRef}
            action={handleAction}
            className="flex flex-col items-center gap-3"
        >
            <label htmlFor="logo" className="text-xl font-bold">
                Изменить лого
            </label>
            <input
                id="logo"
                type="file"
                accept="image/png"
                name="logo"
            />
            <FormSuccess message={success} />
            <FormError message={error} />
            <Submit />
        </form>
    );
};

function Submit() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            Заменить
        </Button>
    );
};