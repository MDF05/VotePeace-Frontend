import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { type ReactNode } from "react";
import configColor from "~/color/configColor";

interface FlexibleBoxProps {
  children: string;
  icon?: ReactNode;
}

export default function TrustText({
  children,
  icon = <CheckCircleOutlineIcon sx={{ color: configColor.colorYoungBlue1 }} />,
}: FlexibleBoxProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        cursor: "default",
        color: "#00b0ff",
      }}
    >
      {icon}
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#e0f7fa",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
