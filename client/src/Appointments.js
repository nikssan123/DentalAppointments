import React, { useState, useEffect, useRef } from "react";
import api from "axios";
import { Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import { formatDate } from "./utils/date";
import { ConfirmMessage } from "./Components/ConfirmMessage";
import { CalendarCard } from "./Components/CalendarCard";
import { TimeSlotsCard } from "./Components/TimeSlotsCard";
import { UserInfoCard } from "./Components/UserInfoCard";

const phoneRegex = /^\+?[0-9]{7,15}$/;

export default function DentistBookingUI() {
    const [ date, setDate ] = useState(null);
    const [ takenSlots, setTakenSlots ] = useState([]);
    const [ selectedTime, setSelectedTime ] = useState(null);
    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ open, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errors, setErrors ] = useState({
        name: "",
        phone: "",
        time: "",
    });

    const timeSlotsRef = useRef(null);

    useEffect(
        () => {
            if (!date) return;

            fetchTakenSlots();

            const timer = setTimeout(() => {
                if (timeSlotsRef.current) {
                    timeSlotsRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);

            return () => clearTimeout(timer);
        },
        [ date ]
    );

    const timeSlots = [ "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00" ];

    const handleClose = () => {
        setOpen(false);
    };

    const onDateChange = newValue => {
        setDate(newValue);
        setSelectedTime(null);
    };

    const handleSelectedTime = time => {
        setSelectedTime(time);
        if (errors.time) {
            setErrors(prev => ({ ...prev, time: "" }));
        }
    };

    const fetchTakenSlots = async () => {
        try {
            const res = await api.get("/api/bookings/availability", {
                params: { date: formatDate(date) },
            });
            setTakenSlots(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleConfirmAppointment = async () => {
        let hasError = false;
        const newErrors = { name: "", phone: "" };

        if (!name.trim()) {
            newErrors.name = "Name is required";
            hasError = true;
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
            hasError = true;
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Invalid phone number";
            hasError = true;
        }

        if (!selectedTime) {
            newErrors.time = "Please select an available time slot";
            hasError = true;
        }

        if (!date) {
            return;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);

            await api.post("/api/bookings", {
                name,
                phone,
                date: formatDate(date),
                time: selectedTime,
            });

            setErrors({ name: "", phone: "" });
            setOpen(true);
            setSelectedTime(null);
            setName("");
            setPhone("");
            await fetchTakenSlots();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #F7F4F2, #ECE6E2)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: { xs: 4, sm: 6 },
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    width: "100%",
                    px: { xs: 2, sm: 3 },
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 3, sm: 4 },
                }}
            >
                <Box textAlign="center" mb={4}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                    >
                        Book Your Dental Appointment
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: "1.4rem", sm: "1.8rem" } }}
                    >
                        With Dr. Zhelezova
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                    >
                        Select a date and choose an available time
                    </Typography>

                    <Typography
                        mt={2}
                        sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                            lineHeight: 1.6,
                        }}
                    >
                        📍 <strong>Dentist Dr. Zhelezova</strong>
                        <br />
                        ul. Debar 4, Varna, Bulgaria
                    </Typography>

                    <Typography
                        component="a"
                        href="https://www.google.com/maps/place/Varna+CenterOdesos,+ul.+%22Debar%22+4,+9000+Varna/@43.2015297,27.9127869,18z/data=!3m1!4b1!4m6!3m5!1s0x40a453f1545d00b7:0x15fdc03f5e68747d!8m2!3d43.2015278!4d27.9140744!16s%2Fg%2F11c5pwssl1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: "inline-block",
                            mt: 0.5,
                            fontSize: "0.85rem",
                            color: "#C9A18A",
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        View on Google Maps
                    </Typography>
                </Box>

                <CalendarCard date={date} onDateChange={onDateChange} />

                {date && (
                    <Box ref={timeSlotsRef} sx={{ scrollMarginTop: "20px" }}>
                        <TimeSlotsCard
                            timeSlots={timeSlots}
                            selectedTime={selectedTime}
                            setSelectedTime={handleSelectedTime}
                            takenSlots={takenSlots}
                            errors={errors}
                        />
                    </Box>
                )}

                {date && (
                    <UserInfoCard
                        phone={phone}
                        setPhone={setPhone}
                        name={name}
                        setName={setName}
                        errors={errors}
                        setErrors={setErrors}
                    />
                )}

                {date && (
                    <React.Fragment>
                        <Button
                            onClick={handleConfirmAppointment}
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: "#C9A18A",
                                color: "#FFFFFF",
                                borderRadius: 3,
                                py: { xs: 1.5, sm: 2 },
                                fontWeight: 600,
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                                "&:hover": { backgroundColor: "#B8927C" },
                            }}
                        >
                            Confirm Appointment
                        </Button>

                        <Box mt={6} textAlign="center">
                            {/* SEO TEXT */}
                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    color: "#3E3A39",
                                    mb: 0.5,
                                }}
                            >
                                Д-р Мирела Железова – Зъболекар Варна
                            </Typography>

                            <Typography
                                component="p"
                                sx={{
                                    fontSize: "0.85rem",
                                    color: "text.secondary",
                                    maxWidth: 420,
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                Стоматолог във Варна с възможност за онлайн записване на час.
                            </Typography>

                            {/* FOOTER */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.85rem" }}
                            >
                                © {new Date().getFullYear()} FornaxElit
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: "0.85rem",
                                    mt: 0.5,
                                }}
                            >
                                Contact:{" "}
                                <Box
                                    component="a"
                                    href="mailto:fornaxelit@gmail.com"
                                    sx={{
                                        color: "#C9A18A",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    fornaxelit@gmail.com
                                </Box>
                            </Typography>
                        </Box>
                    </React.Fragment>
                )}

                <ConfirmMessage open={open} handleClose={handleClose} />
            </Container>

            {isLoading && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        zIndex: 2000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress size={60} sx={{ color: "#C9A18A" }} />
                </Box>
            )}
        </Box>
    );
}
