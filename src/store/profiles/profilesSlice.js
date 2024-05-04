import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const profilesInitialState = {
  allProfilesList: [],
  loading: false,
};

// All profiles
export const getAllProfiles = createAsyncThunk(
  "profiles/getAllProfiles",
  async () => {
    const response = await fetch(
      `${BASE_URL}/profiles/?_venues=true&_bookings=true`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Profile fetch failed");
    }
    const data = await response.json();
    console.log("all profiles dataa", data);
    return data;
  }
);

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: profilesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProfiles.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getAllProfiles.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload || "Failed to fetch profiles";
    });
    builder.addCase(getAllProfiles.fulfilled, (state, action) => {
      state.allProfilesList = action.payload.data;
    });
  },
});
export const {} = profilesSlice.actions;
export default profilesSlice.reducer;
