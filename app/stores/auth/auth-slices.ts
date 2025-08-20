import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginAsync, registerAsync } from "./auth-async";
import { UserDTO } from "~/DTO/user-dto.js";
import Cookies from "js-cookie";

export interface AuthState {
  token: string;
  user?: UserDTO;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  token: Cookies.get("token") || "", 
  user: undefined,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGOUT(state) {
      state.token = "";
      state.user = undefined;
      Cookies.remove("token"); 
    },
  },
  extraReducers(builder) {
    // REGISTER
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // LOGIN
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.content.token;
        state.user = action.payload.content.user;

        //  simpan token ke cookie dengan expired 1 hari
        Cookies.set("token", action.payload.content.token, { expires: 1 });
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // CHECK AUTH
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // update cookie kalau ada perubahan
        Cookies.set("token", action.payload.token, { expires: 1 });
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { LOGOUT } = authSlice.actions;
export default authSlice.reducer;
