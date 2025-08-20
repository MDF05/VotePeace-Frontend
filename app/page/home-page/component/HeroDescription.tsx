import { Typography, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroDescription() {
  return (
    <Box mt={2}>
      <Typography
        variant="body1"
        sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px" }}
      >
        Experience transparent, secure, and AI-powered voting with real-time
        insights and advanced analytics for your university elections.
      </Typography>
    </Box>
  );
}
