const { DateTime } = require("luxon");

exports.formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

exports.isNextDayBookingBlocked = () => {
    const now = DateTime.now().setZone("Europe/Sofia");

    if (now.hour < 17) return false;

    return (
        (now.weekday >= 1 && now.weekday <= 4) || // Mon–Thu
        now.weekday === 7 // Sunday
    );
};
