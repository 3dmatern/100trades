import z from "zod";

export const EntrieTagSchema = z
    .object({
        userId: z.string(),
        entrieId: z.string(),
        tagId: z.string(),
    })
    .refine((data) => {
        if (!data.entrieId) {
            return false;
        }

        return true;
    })
    .refine((data) => {
        if (!data.tagId) {
            return false;
        }

        return true;
    });

export const TagSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export const RiskRewardSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export const EntrieSchema = z
    .object({
        id: z.string(),
        sheetId: z.string(),
        name: z.optional(z.string()),
        pose: z.optional(z.string()),
        risk: z.optional(z.string()),
        profit: z.optional(z.string()),
        entryDate: z.optional(z.string()),
        imageStart: z.optional(z.string()),
        deposit: z.optional(z.string()),
        progress: z.optional(z.string()),
        exitDate: z.optional(z.string()),
        imageEnd: z.optional(z.string()),
        take: z.optional(z.string()),
        stress: z.optional(z.number()),
        notes: z.optional(z.string()),
        timeInTrade: z.optional(z.string()),
        resultId: z.optional(z.string()),
        rrId: z.optional(z.string()),
        entrieTag: z.optional(z.array()),
    })
    .refine((data) => {
        if (!data.id) {
            return false;
        }

        return true;
    })
    .refine((data) => {
        if (!data.sheetId) {
            return false;
        }

        return true;
    });

export const SheetCreateSchema = z
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

export const SheetUpdateSchema = z
    .object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
    })
    .refine((data) => {
        if (!data.id) {
            return false;
        }

        return true;
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

export const SheetRemoveSchema = z
    .object({
        sheetId: z.string(),
        userId: z.string(),
    })
    .refine((data) => {
        if (!data.sheetId) {
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
