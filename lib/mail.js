import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendPasswordResetEmail(email, token) {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Сбросить  пароль",
        html: `<p>Нажми <a href="${resetLink}">здесь</a> для сброса пароля.</p>`,
    });
}

export async function sendVerificationEmail(email, token, password = null) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    const htmlNotPassword = `<p>Нажми <a href="${confirmLink}">здесь</a> для подтверждения email.</p>`;
    const htmlWithPassword = `
        <div>
            <p>Нажми <a href="${confirmLink}">здесь</a> для подтверждения email.</p>
            ${
                password &&
                "<p>Ваш пароль: <strong>" + password + "</strong></p>"
            }
        </div>
    `;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Подтвердите свой Email",
        html: password ? htmlWithPassword : htmlNotPassword,
    });
}
