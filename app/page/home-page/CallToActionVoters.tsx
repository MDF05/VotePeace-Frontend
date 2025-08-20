import { Box, Typography, Button, Stack } from "@mui/material";
import configColor from "~/color/configColor";

export default function CallToActionVoters() {
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        borderRadius: 3,
        textAlign: "center",
        color: "white",
        px: 4,
        py: 6,
        border: "1px solid rgba(0, 200, 255, 0.3)",
        boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
        maxWidth: 800,
        mx: "auto",
        mt: 6,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          textShadow: configColor.textShadow,
        }}
      >
        Ready to Experience the Future?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Join thousands of voters already using VotePeace for secure and
        transparent elections
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#facc15",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#eab308",
            },
          }}
        >
          Start Your Vote
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.5)",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            "&:hover": {
              borderColor: configColor.colorYoungBlue2,
              bgcolor: "rgba(0,194,255,0.1)",
            },
          }}
        >
          Admin Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
