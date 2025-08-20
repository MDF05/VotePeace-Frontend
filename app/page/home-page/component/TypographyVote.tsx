import { Typography, Box } from "@mui/material";
import configColor from "~/color/configColor";

export default function TypographyVote() {
  return (
    <Box>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0px 0px 15px rgba(255,255,255,0.8)",
        }}
      >
        The Future of
      </Typography>

      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: configColor.colorYoungBlue2,
        }}
      >
        Student Voting
      </Typography>
    </Box>
  );
}
