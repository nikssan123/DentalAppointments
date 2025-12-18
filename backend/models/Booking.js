// models/Booking.js
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        date: {
            type: String, // YYYY-MM-DD
            required: true,
        },
        time: {
            type: String, // "09:00"
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
