import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
} from "@mui/material";

export const AppointmentDialog = ({ open, handleClose, selectedEvent, handleDelete }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Appointment Details</DialogTitle>

            <DialogContent>
                {selectedEvent && (
                    <Stack spacing={1}>
                        <Typography>
                            <strong>Patient:</strong> {selectedEvent.title}
                        </Typography>
                        <Typography>
                            <strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}
                        </Typography>
                        <Typography>
                            <strong>Time:</strong>{" "}
                            {selectedEvent.start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>
                        <Typography>
                            <strong>Phone:</strong> {selectedEvent.phone}
                        </Typography>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    Delete Appointment
                </Button>

                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
