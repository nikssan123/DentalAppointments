require("dotenv").config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Booking = require("./models/Booking");
const { formatDate } = require("./utils/date");

const MONGO_URI = process.env.MONGO_URI;

async function sendDailyAppointments() {
    try {
        await mongoose.connect(MONGO_URI);

        const today = formatDate(new Date());

        const bookings = await Booking.find({
            date: { $gte: today },
            seen: false,
        }).sort({ date: 1, time: 1 });

        console.log(bookings);

        if (bookings.length === 0) {
            console.log("No new appointments to notify.");
            return;
        }

        const emailText = bookings
            .map(
                b =>
                    `Name: ${b.name}
                    Phone: ${b.phone}
                    Time: ${b.time}`
            )
            .join("\n----------------\n");

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

        await transporter.sendMail({
            from: process.env.GMAIL_SENDER,
            to: process.env.GMAIL_RECEIVER,
            subject: `New appointments for ${today}`,
            text: emailText,
        });

        // Mark bookings as seen ONLY after successful email
        await Booking.updateMany(
            { _id: { $in: bookings.map(b => b._id) } },
            { $set: { seen: true } }
        );

        console.log(`Daily email sent. ${bookings.length} appointments marked as seen.`);
    } catch (err) {
        console.error("Error sending daily appointments:", err);
    } finally {
        await mongoose.connection.close();
    }
}

sendDailyAppointments();
