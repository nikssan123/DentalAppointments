import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
    return (
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
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
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
    );
};
