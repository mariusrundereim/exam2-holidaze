import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
const profileInitialState = {
  name: "",
  email: "",
  bio: "",
  avatar: {
    url: "",
    alt: "",
  },
  banner: {
    url: "",
    alt: "",
  },
  venueManager: false,
  _count: {
    venues: 0,
    bookings: 0,
  },
  venues: [],
  bookings: [],
};

// Single profile
export const fetchProfileByName = createAsyncThunk(
  "profiles/fetchProfileByName",
  async (profileName, bookings, venues) => {
    const queryParams = new URLSearchParams();
    if (bookings) queryParams.append("_bookings=true", bookings);
    if (venues) queryParams.append("_venues=true", venues);
    const response = await fetch(
      `${BASE_URL}/profiles/${profileName}?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Profile fetch failed");
    }
    const data = await response.json();
    console.log("daa", data);
    return data.data;
  }
);

// Venues by Profile
export const getVenuesByProfile = createAsyncThunk(
  "profiles/getVenuesByProfile",
  async (profileName) => {
    const response = await fetch(`${BASE_URL}/profiles/${profileName}/venues`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    return data;
  }
);

// Big profile slicer

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    setProfileData(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    resetProfileData(state) {
      return profileInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileByName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileByName.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProfileByName.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
