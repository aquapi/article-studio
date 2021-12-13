// @ts-check

/**
 * @param {import("nodemailer").Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>} transporter 
 */
export const createMailSender = transporter =>
(
    /**
     * @param {import("nodemailer/lib/mailer").Options} mailOptions 
     */
    async mailOptions =>
        new Promise((res, rej) =>
            transporter.sendMail(mailOptions, (err, info) => err ? rej(err) : res(info))
        )
);

/**
 * @param {import("express-session").Session & Partial<import("express-session").SessionData>} session 
 */
export const remove =
    async session =>
        new Promise((res, rej) => {
            session.destroy(err => err ? rej(err) : res());
        });