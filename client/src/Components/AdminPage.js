import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import api from "axios";

export default function AdminPage() {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ appointments, setAppointments ] = useState([]);
    const [ error, setError ] = useState("");

    const [ page, setPage ] = useState(0);
    const rowsPerPage = 10;

    const handleLogin = async () => {
        try {
            const res = await api.post("/api/admin/login", { username, password });
            if (res.status === 200) {
                setLoggedIn(true);
                fetchAppointments();
            }
        } catch (err) {
            console.error(err);
            setError("Invalid credentials");
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await api.post("/api/admin/bookings", {
                username: username,
                password: password,
            });
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (!loggedIn) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <Typography variant="h5" mb={3} textAlign="center">
                        Admin Login
                    </Typography>
                    {error && (
                        <Typography color="error" mb={2}>
                            {error}
                        </Typography>
                    )}
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" fullWidth onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Container>
        );
    }

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
                maxWidth="lg"
                sx={{
                    width: "100%",
                    px: { xs: 2, sm: 3 },
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 3, sm: 4 },
                }}
            >
                <Typography variant="h4" mb={4} textAlign="center">
                    Appointments
                </Typography>
                <TableContainer
                    component={Paper}
                    sx={{
                        mb: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 20px 40px rgba(62, 58, 57, 0.08)",
                        width: "100%",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.length > 0 &&
                                appointments
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(a => (
                                        <TableRow key={a._id}>
                                            <TableCell>{a.name}</TableCell>
                                            <TableCell>{a.phone}</TableCell>
                                            <TableCell>{a.date}</TableCell>
                                            <TableCell>{a.time}</TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={appointments.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]}
                    />
                </TableContainer>
            </Container>
        </Box>
    );
}
