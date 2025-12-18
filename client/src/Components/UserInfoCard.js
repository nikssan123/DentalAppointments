import React from "react";
import { Typography, Card, CardContent, TextField } from "@mui/material";

export const UserInfoCard = ({ name, phone, setName, setPhone, errors, setErrors }) => {
    return (
        <Card
            sx={{
                mb: 4,
                borderRadius: 4,
                backgroundColor: "#FFFFFF",
                boxShadow: "0 20px 40px rgba(62, 58, 57, 0.08)",
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="medium" mb={2}>
                    Your Information
                </Typography>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                        if (errors?.name) setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={e => {
                        setPhone(e.target.value);
                        if (errors?.phone) setErrors(prev => ({ ...prev, phone: "" }));
                    }}
                    error={Boolean(errors?.phone)}
                    helperText={errors?.phone}
                />
            </CardContent>
        </Card>
    );
};
