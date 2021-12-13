/**
 * @param {import("nodemailer").Transporter<SMTPTransport.SentMessageInfo>} transporter
 */
export default transporter =>
(
    async mailOptions =>
        new Promise((res, rej) =>
            transporter.sendMail(mailOptions, (err, info) => err ? rej(err) : res(info))
        )
);