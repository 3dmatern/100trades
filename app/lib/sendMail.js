const nodemailer = require("nodemailer");

export async function sendMail(from, to, subject, text, html) {
    try {
        const testEmailAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testEmailAccount.user,
                pass: testEmailAccount.pass,
            },
        });

        await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.error("Ошибка отправки email-письма");
    }
}
