import React from "react";
import { Typography, Card, CardContent, Button, Box, Alert } from "@mui/material";

export const TimeSlotsCard = ({
    timeSlots,
    selectedTime,
    setSelectedTime,
    takenSlots = [],
    errors,
}) => {
    return (
        <Card
            sx={{
                mb: { xs: 3, sm: 4 },
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 20px 40px rgba(62, 58, 57, 0.08)",
            }}
        >
            <CardContent
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 2, sm: 3 },
                }}
            >
                {errors.time && (
                    <Alert
                        severity="warning"
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            backgroundColor: "#FFF6F2",
                            color: "#6B4F43",
                            "& .MuiAlert-icon": {
                                color: "#C9A18A",
                            },
                        }}
                    >
                        {errors.time}
                    </Alert>
                )}
                <Typography
                    variant="h6"
                    fontWeight="medium"
                    mb={2}
                    sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                    Pick a Time
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "center",
                    }}
                >
                    {timeSlots.map(t => {
                        const isTaken = takenSlots.includes(t);
                        const isSelected = selectedTime === t;

                        return (
                            <Button
                                key={t}
                                variant={isSelected ? "contained" : "outlined"}
                                disabled={isTaken}
                                onClick={() => setSelectedTime(t)}
                                sx={{
                                    width: "calc(25% - 12px)",
                                    minWidth: 80,
                                    borderColor: "#E0D4CB",
                                    color: isSelected ? "#fff" : "#3E3A39",
                                    backgroundColor: isSelected ? "#C9A18A" : undefined,
                                    "&:hover": {
                                        backgroundColor: isSelected
                                            ? "#B8927C"
                                            : isTaken ? undefined : "#F3ECE8",
                                    },
                                }}
                            >
                                {t}
                            </Button>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};
