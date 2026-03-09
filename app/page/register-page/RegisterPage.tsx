import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/stores/global-stores";
import { registerAsync } from "~/stores/auth/auth-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "~/schemas/register-schema";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    const res = await dispatch(registerAsync(data));
    if (registerAsync.fulfilled.match(res)) {
      navigate("/login");
    }
  };
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="NIK"
              variant="outlined"
              margin="normal"
              {...register("nik")}
              error={!!errors.nik}
              helperText={errors.nik?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
            />
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
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
              {loading ? "Loading..." : "Register"}
            </Button>
          </form>

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
