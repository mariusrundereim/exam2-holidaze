import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const profilesInitialState = {
  searchResults: [],
  metaDetails: {},
  whitelist: [
    "Simonsen",
    "Julianne34",
    "simentobias232",
    "JanneMerethe",
    "ThereseOlavsen",
  ],
  loading: false,
  error: null,
};

// Fetch all profiles
export const getAllProfiles = createAsyncThunk(
  "profiles/getAllProfiles",
  async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/profiles/?sortOrder=asc&_bookings=true&_venues=true`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Profile fetch failed");
      }

      const data = await response.json();
      console.log("aaaaaaaaaaaa:", data.data); // Debugging log
      return data;
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }
);

// Fetch all venues by profile name

export const getAllVenuesByProfileName = createAsyncThunk(
  "profiles/getAllVenuesByProfileName",
  async (name) => {
    const response = await fetch(
      `${BASE_URL}/profiles/${name}/venues?_owner=true&_bookings=true`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await response.json();
    console.log("Fetched venues by profile name:", data); // Debugging log
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

// Select whitelisted profile names
export const selectWhitelistedProfileNames = (state) =>
  state.profiles.whitelistedProfiles.map((profile) => profile.owner.name);

// Profiles Slice

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: profilesInitialState,
  reducers: {
    setProfiles(state, action) {
      console.log("Set profiles action payload:", action.payload); // Debugging log
      state.allProfiles = action.payload;
      state.whitelistedProfiles = state.allProfiles.filter((profile) =>
        state.whitelist.includes(profile.owner.name)
      );
      console.log(
        "Whitelisted profiles after setProfiles:",
        state.whitelistedProfiles
      ); // Debugging log
    },
    updateWhitelist(state, action) {
      console.log("Update whitelist action payload:", action.payload); // Debugging log
      state.whitelist = action.payload;
      state.whitelistedProfiles = state.allProfiles.filter((profile) =>
        state.whitelist.includes(profile.owner.name)
      );
      console.log(
        "Whitelisted profiles after updateWhitelist:",
        state.whitelistedProfiles
      ); // Debugging log
    },
  },
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
      console.log("Get all profiles fulfilled action payload:", action.payload); // Debugging log
      state.allProfiles = action.payload.data;
      state.metaDetails = action.payload.meta;
      state.loading = false;
      state.whitelistedProfiles = action.payload.data.filter((profile) =>
        state.whitelist.includes(profile.owner.name)
      );
      console.log(
        "Whitelisted profiles after getAllProfiles:",
        state.whitelistedProfiles
      ); // Debugging log
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
export const { setProfiles, updateWhitelist } = profilesSlice.actions;
export default profilesSlice.reducer;
