import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponseDTO } from "~/DTO/login-response-dto";
import { RegisterResponseDTO } from "~/DTO/register-response-dto";
import  { isAxiosError } from "axios";
import { CheckTokenDTO } from "~/DTO/check-token-dto";
import { apiAxios } from "~/libs/axios";
import { toast } from "react-toastify";
import { RegisterSchema } from "~/schemas/register-schema";
import { LoginSchema } from "~/schemas/login-schema";


export const registerAsync = createAsyncThunk<RegisterResponseDTO, RegisterSchema>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await apiAxios.post("/register", data);
      toast.success("Register Success! Please login first");
      return res.data; 
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Register failed");
      } else {
        toast.error("Register failed, please try again");
      }
      return thunkAPI.rejectWithValue("failed registration");
    }
  }
);



export const loginAsync = createAsyncThunk<LoginResponseDTO, LoginSchema>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await apiAxios.post("/login", data);
      const { token, user } = res.data.content;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful, enjoy the app 🙂");
      console.log(res.data)
      return res.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Login failed");
      } else {
        toast.error("Login failed, please try again");
      }
      return thunkAPI.rejectWithValue("failed login");
    }
  }
);



export const checkAuth = createAsyncThunk<CheckTokenDTO, void>(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("no token");
      }

      const res = await apiAxios.get("/check");

      if (!res.data.content) {
        localStorage.removeItem("token");
        return thunkAPI.rejectWithValue("not authenticated");
      }

      return res.data.content;
    } catch (error: unknown) {
      localStorage.removeItem("token");

      if (isAxiosError(error)) {
        toast.error("Session expired, please login again!");
      } else {
        toast.error("Invalid user, please login again");
      }

      return thunkAPI.rejectWithValue("invalid token");
    }
  }
);
