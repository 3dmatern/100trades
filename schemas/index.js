import z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email обязателен",
    }),
    password: z.string().min(1, { message: "Пароль обязателен." }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email обязателен",
    }),
});
