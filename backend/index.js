require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

const dirname = path.resolve();

app.use(express.static(path.join(dirname, "..", "client", "build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(dirname, "..", "client", "build", "index.html"));
});

app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ message: "Not found" });
    }
    res.redirect("/");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch(e => {
        console.log("in error");
        console.log(e);
    });
