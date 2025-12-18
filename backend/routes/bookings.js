const express = require("express");
const Booking = require("../models/Booking");
// const { sendMail } = require("../utils/mail");

const router = express.Router();

router.get("/availability", async (req, res) => {
    const { date } = req.query;

    const bookings = await Booking.find({ date });
    const bookedTimes = bookings.map(b => b.time);

    res.json(bookedTimes);
});

router.post("/", async (req, res) => {
    const { name, phone, date, time } = req.body;

    try {
        const existing = await Booking.findOne({ date, time });

        if (existing) {
            return res.status(400).json({ message: "Time slot already booked" });
        }

        // await sendMail(name, phone, date, time);

        const booking = await Booking.create({
            name,
            phone,
            date,
            time,
        });

        res.status(201).json(booking);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.get("/available-dates", async (req, res) => {
    try {
        const { year, month } = req.query;
        if (!year || !month) return res.status(400).json({ message: "Year and month required" });

        const y = parseInt(year, 10);
        const m = parseInt(month, 10) - 1; // JS month is 0-indexed

        const ALL_SLOTS = [ "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00" ];

        // Generate all days in the month
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const allDates = Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1;
            const day = new Date(y, m, d);
            return {
                dateStr: day.toISOString().split("T")[0],
                dayOfWeek: day.getDay(), // Sunday=0, Saturday=6
            };
        });

        // Fetch all bookings for this month
        const bookings = await Booking.find({
            date: {
                $gte: `${year}-${String(m + 1).padStart(2, "0")}-01`,
                $lte: `${year}-${String(m + 1).padStart(2, "0")}-${daysInMonth}`,
            },
        });

        // Filter only dates that are weekdays and have at least one free slot
        const availableDates = allDates
            .filter(d => d.dayOfWeek !== 0 && d.dayOfWeek !== 6) // exclude weekends
            .filter(d => {
                const bookedTimes = bookings.filter(b => b.date === d.dateStr).map(b => b.time);
                return bookedTimes.length < ALL_SLOTS.length;
            })
            .map(d => d.dateStr);

        res.json(availableDates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
