import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
const profilesInitialState = {
  allProfilesList: [],
  searchResults: [],
  metaDetails: {},
  loading: false,
  error: null,
};

// All profiles

export const getAllProfiles = createAsyncThunk(
  "profiles/getAllProfiles",
  async (page) => {
    const response = await fetch(
      `${BASE_URL}/profiles/?page=${page}&sortOrder=asc`,
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

// Search profiles

export const searchProfiles = createAsyncThunk(
  "profiles/searchProfiles",
  async (query) => {
    const response = await fetch(`${BASE_URL}/profiles/search?q=${query}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    console.log("searched profiles", data);
    return data;
  }
);

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: profilesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProfiles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProfiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllProfiles.fulfilled, (state, action) => {
      state.allProfilesList = action.payload.data;
      state.metaDetails = action.payload.meta;
      state.loading = false;
    });
    builder.addCase(searchProfiles.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(searchProfiles.rejected, (state, action) => {
      state.loading = "idle";
    });
    builder.addCase(searchProfiles.fulfilled, (state, action) => {
      state.searchResults = action.payload.data;
    });
  },
});
export const {} = profilesSlice.actions;
export default profilesSlice.reducer;
