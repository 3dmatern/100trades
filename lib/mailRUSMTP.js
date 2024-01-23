import nodemailer from "nodemailer";

const login = process.env.MAIL_RU_LOGIN;
const pass = process.env.MAIL_RU_PASS;
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendPasswordResetEmailSMTP(email, token) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: login,
                pass: pass,
            },
        });

        const resetLink = `${domain}/auth/new-password?token=${token}`;

        const mailOptions = {
            from: "100trades@100trades.ru",
            to: email,
            subject: "Сбросить пароль",
            text: `Нажми: ${resetLink} для сброса пароля.`,
            html: `<p>Нажми <a href="${resetLink}">здесь</a> для сброса пароля.</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).end("Ошибка отправки формы");
            } else {
                console.log("Email отправлен: " + info.response);
                res.status(200).end("Форма успешно отправлена");
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function sendVerificationEmailSMTP(email, token, password = null) {
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
    const textNotPassword = `Нажми: ${confirmLink} для подтверждения email.</p>`;
    const textWithPassword = `Нажми: ${confirmLink} для подтверждения email. ${
        password && "Ваш пароль: " + password
    }`;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: login,
                pass: pass,
            },
        });

        const mailOptions = {
            from: "100trades@100trades.ru",
            to: email,
            subject: "Подтвердите свой Email",
            text: password ? textWithPassword : textNotPassword,
            html: password ? htmlWithPassword : htmlNotPassword,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).end("Ошибка отправки формы");
            } else {
                console.log("Email отправлен: " + info.response);
                res.status(200).end("Форма успешно отправлена");
            }
        });
    } catch (error) {
        console.error(error);
    }
}
