import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_URL } from "../../config/env";
import { setUserProfile } from "./userSlice";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
  credentials: { email: "", password: "" },
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginPayload, { dispatch }) => {
    const response = await fetch(`${AUTH_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    });

    console.log("do i get a response? :");
    console.log(response);

    const { email, password } = loginPayload;

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data);
    dispatch(setUserProfile(data.data));
    return data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (registerPayload, { rejectWithValue, dispatch }) => {
    const response = await fetch(`${AUTH_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    dispatch(setUserProfile(data.data));

    return data.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.credentials = {};
      localStorage.removeItem("accessToken");
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.data.accessToken;
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to log in";
        state.accessToken = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to register";
        state.accessToken = null;
      });
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
