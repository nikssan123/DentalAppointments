import api from "../api";
import { formatDate } from "./date";

export const fetchTakenSlots = async (type, date) => {
    try {
        let res;
        switch (type) {
            case "day":
                res = await api.get("/api/bookings/availability", {
                    params: { date: formatDate(date) },
                });

                return res.data;
            case "month":
                res = await api.get(`/api/bookings/availability/month?month=${date}`);

                return res.data;
            default:
                return [];
        }
    } catch (err) {
        console.error(err);
    }
};
