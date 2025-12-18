import React, { useEffect, useState } from "react";
import api from "axios";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { enGB } from "date-fns/locale";

export const CalendarCard = ({ date, onDateChange }) => {
    const [ availableDates, setAvailableDates ] = useState([]);

    useEffect(() => {
        fetchAvailableDates(new Date());
    }, []);

    const fetchAvailableDates = async monthDate => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth() + 1;

        const res = await api.get("/api/bookings/available-dates", {
            params: { year, month },
        });

        setAvailableDates(res.data);
    };

    const shouldDisableDate = day => {
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, "0");
        const date = String(day.getDate()).padStart(2, "0");

        const formatted = `${year}-${month}-${date}`;

        // Disable if NOT in availableDates
        return !availableDates.includes(formatted);
    };

    return (
        <Card
            sx={{
                mb: { xs: 3, sm: 4 },
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 20px 40px rgba(62, 58, 57, 0.08)",
                width: "100%",
            }}
        >
            <CardContent
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="medium"
                    mb={2}
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, textAlign: "center" }}
                >
                    Choose a Date
                </Typography>

                <Box
                    sx={{
                        ".MuiPickersCalendar-root": { width: "100%" },
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                        <DateCalendar
                            value={date}
                            minDate={new Date()}
                            onChange={onDateChange}
                            onMonthChange={fetchAvailableDates}
                            shouldDisableDate={shouldDisableDate}
                            sx={{
                                "& .MuiPickersDay-root": {
                                    borderRadius: "12px",
                                    fontWeight: 500,
                                    minWidth: { xs: 36, sm: 40 },
                                    minHeight: { xs: 36, sm: 40 },
                                },
                                "& .MuiPickersDay-root.Mui-selected": {
                                    backgroundColor: "#C9A18A",
                                    color: "#FFFFFF",
                                    "&:hover": { backgroundColor: "#B8927C" },
                                    "&:focus": { backgroundColor: "#C9A18A", color: "#FFFFFF" },
                                },
                                "& .MuiPickersDay-root.MuiPickersDay-today": {
                                    border: "1px solid #E0D4CB",
                                },
                                "& .MuiPickersDay-root:hover": {
                                    backgroundColor: "#F3ECE8",
                                },
                                "& .MuiPickersDay-root.Mui-disabled": {
                                    color: "#BDB2AB",
                                    backgroundColor: "transparent",
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </CardContent>
        </Card>
    );
};
