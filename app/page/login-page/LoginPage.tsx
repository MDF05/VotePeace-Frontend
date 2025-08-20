// src/pages/auth/LoginPage.tsx
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/stores/global-stores";
import { loginAsync } from "~/stores/auth/auth-async";
import { loginSchema, LoginSchema } from "~/schemas/login-schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginResponseDTO } from "~/DTO/login-response-dto";
import Cookies from "js-cookie";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const dataResponse: LoginResponseDTO = await dispatch(
        loginAsync(data)
      ).unwrap();

      if (
        dataResponse.status === 200 &&
        dataResponse.succes &&
        dataResponse.content.token
      ) {
        Cookies.set("token", dataResponse.content.token);
        navigate("/campaign");
      }
    } catch (error) {
      console.error("Login failed", error);
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
            Welcome Voter
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
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }} color="white">
            Belum punya akun?{" "}
            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              color="cyan"
            >
              Register
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
