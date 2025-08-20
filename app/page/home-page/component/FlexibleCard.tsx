// components/DashboardCard.jsx

import { Box, Typography, Paper, useTheme } from "@mui/material";
import { Children, type ReactNode } from "react";
import configColor from "~/color/configColor";

interface FlexibleCard {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  changeColor: string;
}

export default function FlexibleCard({
  icon,
  title,
  value,
  change,
  changeColor = "primary.main",
}: FlexibleCard) {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(90deg, #030A1C, #09101E)",
        minWidth: 250,
        boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 0 25px rgba(0, 150, 255, 0.6)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" color={configColor.white}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color={configColor.white}>
          {value}
        </Typography>
        <Typography variant="caption" color={configColor.white}>
          {change}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: configColor.colorYoungBlue2,
          p: 1.5,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </Paper>
  );
}
