import React from "react";
import { Box, Typography } from "@mui/material";
import RevenueReport from "./RevenueReport";

export default function Report() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
            overflow: 'hidden',
            backgroundColor: '#fff',
            borderRadius: '15px',
            paddingTop: '15px',
        }}>
            <RevenueReport />
        </Box>
    );
}
