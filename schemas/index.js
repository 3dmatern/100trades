import z from "zod";

export const SheetSchema = z
    .object({
        userId: z.string(),
        name: z.string(),
    })
    .refine((data) => {
        if (!data.name) {
            return false;
        }

        return true;
    })
    .refine((data) => {
        if (!data.userId) {
            return false;
        }

        return true;
    });

export const SettingsSchema = z
    .object({
        firstname: z.optional(z.string()),
        lastname: z.optional(z.string()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
    })
    .refine(
        (data) => {
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        {
            message: "Новый пароль обязателен!",
            path: ["newPassword"],
        }
    )
    .refine(
        (data) => {
            if (data.newPassword && !data.password) {
                return false;
            }

            return true;
        },
        {
            message: "Пароль обязателен!",
            path: ["password"],
        }
    );

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

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email обязателен",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Минимум 6 смиволов.",
    }),
});
