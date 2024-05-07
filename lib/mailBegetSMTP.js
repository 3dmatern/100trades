import nodemailer from "nodemailer";

const login = process.env.MAIL_BEGET_LOGIN;
const pass = process.env.MAIL_BEGET_PASS;
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendPasswordResetBegetSMTP(email, token) {
    return new Promise((resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.beget.com",
                port: 465,
                secure: true,
                auth: {
                    user: login,
                    pass: pass,
                },
            });

            const resetLink = `${domain}/auth/new-password?token=${token}`;

            const mailOptions = {
                from: login,
                to: email,
                subject: "Журнал Cделок | Сбросить пароль",
                text: `Нажми: ${resetLink} для сброса пароля.`,
                html: `<p>Нажми <a href="${resetLink}">здесь</a> для сброса пароля.</p>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(
                        "Ошибка отправки ссылки на сброс пароля: ",
                        error
                    );
                    reject({ error: "Ошибка отправки формы!" });
                } else {
                    console.log(
                        "Ссылка для сброса пароля отправлена: " + info.response
                    );
                    resolve({
                        success: "Ссылка для сброса отправлена на email.",
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
}

export async function sendVerificationBegetSMTP(email, token, password = null) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}.${password}`;
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

    return new Promise((resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.beget.com",
                port: 465,
                secure: true,
                auth: {
                    user: login,
                    pass: pass,
                },
            });

            const mailOptions = {
                from: login,
                to: email,
                subject: "Журнал Cделок | Активация аккаунта",
                text: password ? textWithPassword : textNotPassword,
                html: password ? htmlWithPassword : htmlNotPassword,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(
                        "Ошибка отправки ссылки верификации: ",
                        error
                    );
                    reject({ error: "Ошибка отправки формы!" });
                } else {
                    console.log(
                        "Ссылка на верификацию отправлена: " + info.response
                    );
                    resolve({
                        success: "Письмо с активацией отправлено на email.",
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
}
