const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: "fornax.elit@gmail.com",
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
        to: "nikssan123@gmail.com",
        from: "fornax.elit@gmail.com",
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
