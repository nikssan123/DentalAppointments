const { DateTime } = require("luxon");

exports.formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

exports.isNextDayBookingBlocked = () => {
    const sofiaDateTime = DateTime.now().setZone("Europe/Sofia");
    const now = sofiaDateTime.toJSDate(); // native Date object
    const hour = now.getHours();
    const today = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    // Only block after 17:00
    if (hour < 17) return false;

    // Block next-day booking if today is Mon–Thu (1–4) or Sunday (0)
    return (today >= 1 && today <= 4) || today === 0;
};
