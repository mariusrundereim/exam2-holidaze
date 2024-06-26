import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { AUTH_URL } from "../../config/env";
import { setProfileData } from "./userSlice";
import { resetUserState } from "./userSlice";
import { resetProfileState } from "../profile/profileSlice";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
};

export const selectAuthState = (state) => state.auth;

export const isLoggedIn = createSelector(
  [selectAuthState],
  (auth) => !!auth.accessToken
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      localStorage.removeItem("accessToken");
      dispatch(resetUserState());
      dispatch(resetProfileState());
      return {};
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (loginPayload, { dispatch }) => {
    const response = await fetch(`${AUTH_URL}/auth/login?_holidaze=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    dispatch(setProfileData(data.data));
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

    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })

      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message || "Logout failed";
        state.isLoading = false;
      });
  },
});
// export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
