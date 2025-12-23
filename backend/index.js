require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

const dirname = path.resolve();

app.use(express.static(path.join(dirname, "..", "client", "build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(dirname, "..", "client", "build", "index.html"));
});

app.use((req, res) => {
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(dirname, "..", "client", "build", "index.html"));
    }
});

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(e => {
        console.log("in error");
        console.log(e);
    });
