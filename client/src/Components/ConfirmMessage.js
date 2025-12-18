import React from "react";
import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

export const ConfirmMessage = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Appointment Confirmed</DialogTitle>
            <DialogContent>
                <Typography>Your appointment has been successfully booked. Thank you!</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: "#C9A18A" }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
