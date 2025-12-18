const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

exports.sendMail = async (name, phone, date, time) => {
    if (!name || !phone || !date || !time) {
        throw new Error("Missing required fields for email");
    }

    const mailOptions = {
        to: process.env.GMAIL_RECEIVER,
        from: process.env.GMAIL_SENDER,
        subject: "🦷 New Dental Appointment Booked",
        text: `
            New appointment booked:

            Name: ${name}
            Phone: ${phone}
            Date: ${date}
            Time: ${time}
        `,
    };

    await transporter.sendMail(mailOptions);
};
