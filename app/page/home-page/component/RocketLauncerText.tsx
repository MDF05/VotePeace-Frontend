import { Box, Typography } from "@mui/material";
import configColor from "~/color/configColor";

export default function RocketLauncherText() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${configColor.colorYoungBlue2}`,
        borderRadius: "20px",
        px: 2,
        py: 0.5,
        backgroundColor: "rgba(30, 136, 229, 0.1)",
        width: "max-content",
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mr: 1,
          animation: "fly 2s infinite ease-in-out",
          "@keyframes fly": {
            "0%": { transform: "translateY(0) rotate(-45deg)" },
            "50%": { transform: "translateY(-5px) rotate(-45deg)" },
            "100%": { transform: "translateY(0) rotate(-45deg)" },
          },
        }}
      >
        🚀
      </Box>
      <Typography
        sx={{
          color: configColor.colorYoungBlue2,
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        Next-Gen Voting System
      </Typography>
    </Box>
  );
}
