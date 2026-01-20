import React, { useState, useEffect } from "react";
import { Box, Dialog, Paper, Typography } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { fetchTakenSlots } from "../utils/fetch";
import { AppointmentDialog } from "./Dialog";
import api from "../api";

import "../styles/global.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const AdminCalendar = () => {
    const [ takenSlots, setTakenSlots ] = useState([]);
    const [ selectedEvent, setSelectedEvent ] = useState(null);

    useEffect(() => {
        (async () => {
            await loadMonth(new Date());
        })();

        console.log(takenSlots);
    }, []);

    const handleEventClick = event => {
        setSelectedEvent(event);
    };

    const loadMonth = async date => {
        const month = date.toISOString().slice(0, 7); // YYYY-MM
        const slots = await fetchTakenSlots("month", month);

        setTakenSlots(
            slots.map(slot => ({ ...slot, start: new Date(slot.start), end: new Date(slot.end) })),
        );
    };

    const handleDelete = async () => {
        if (!selectedEvent) return;

        try {
            await api.delete(`/api/bookings/${selectedEvent.id}`);
            setTakenSlots(prev => prev.filter(e => e.id !== selectedEvent.id));
            setSelectedEvent(null);
        } catch (err) {
            console.error("Failed to delete appointment", err);
            alert("Failed to delete appointment");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Schedule
            </Typography>

            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    height: 700,
                }}
            >
                <Calendar
                    localizer={localizer}
                    events={takenSlots}
                    onNavigate={loadMonth}
                    startAccessor="start"
                    endAccessor="end"
                    views={[ "month", "week", "day" ]}
                    defaultView="month"
                    style={{ height: "100%" }}
                    onSelectEvent={handleEventClick}
                />
            </Paper>

            {selectedEvent && (
                <AppointmentDialog
                    open={!!selectedEvent}
                    handleClose={() => setSelectedEvent(null)}
                    selectedEvent={selectedEvent}
                    handleDelete={handleDelete}
                />
            )}
        </Box>
    );
};
