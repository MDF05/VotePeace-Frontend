import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050B1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 3,
          bgcolor: "rgba(15,25,40,0.9)",
          border: "1px solid rgba(0,200,255,0.3)",
          boxShadow: "0 0 25px rgba(0,200,255,0.3)",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold" }}
            color="white"
          >
            Create Voter Account
          </Typography>

          <TextField
            fullWidth
            label="NIK"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", borderRadius: 10 } }}
          />
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", borderRadius: 10 } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", borderRadius: 10 } }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "rgba(0,200,255,0.9)",
              color: "black",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "cyan",
                boxShadow: "0 0 15px rgba(0,200,255,0.7)",
              },
            }}
          >
            Register
          </Button>

          {/* 🔗 Navigasi ke Login */}
          <Typography variant="body2" sx={{ mt: 2 }} color="white">
            Sudah punya akun?{" "}
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              color="cyan"
            >
              Login
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
