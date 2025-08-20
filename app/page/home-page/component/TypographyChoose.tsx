import { Box, Typography } from "@mui/material";
import configColor from "~/color/configColor";

export default function WhyChooseVotePeace() {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: "white",
          textShadow: configColor.textShadow,
        }}
      >
        Why Choose VotePeace?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: configColor.textShadow,
          maxWidth: "700px",
          mx: "auto",
          fontSize: "1.1rem",
        }}
      >
        Advanced technology meets user-friendly design for the ultimate voting
        experience
      </Typography>
    </Box>
  );
}
