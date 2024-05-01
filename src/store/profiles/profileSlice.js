import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
import { getVenuesByProfile } from "../venues/venueSlice";
import { deleteVenue } from "../venues/venueSlice";

const profileInitialState = {
  bookings: [],
  venues: [],
  venueIds: [],
  bookingsByProfile: [],
  isLoading: false,
  bookingsLoading: false,
};

// Single profile
export const fetchProfileByName = createAsyncThunk(
  "profiles/fetchProfileByName",
  async (profileName) => {
    const response = await fetch(
      `${BASE_URL}/profiles/${profileName}?_customer=true&_bookings=true`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Profile fetch failed");
    }
    const data = await response.json();
    return data;
  }
);

// Bookings by profile

export const getBookingsByProfile = createAsyncThunk(
  "profiles/getBookingsByProfile",
  async (profileName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/profiles/${profileName}/bookings?_bookings=true&_venues=true`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed:" + response.statusText);
      }

      const data = await response.json();
      console.log("BoookingsProfile", data);
      return data;
    } catch (error) {
      console.log("???", error);
    }
  }
);

// Big profile slicer

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    resetProfileData: (state) => {
      // Reset profile data to initial state or clear specific fields
      return initialState;
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
      // Assuming the API response is nested under `data`
      Object.entries(action.payload.data).forEach(([key, value]) => {
        state[key] = value;
      });
      state.isLoading = false;
    });
    builder.addCase(getVenuesByProfile.fulfilled, (state, action) => {
      state.venueIds = action.payload;
    });
    builder.addCase(deleteVenue.fulfilled, (state, action) => {
      state.venueIds = state.venueIds.filter((id) => id !== action.payload);
    });
    builder.addCase(getBookingsByProfile.pending, (state) => {
      state.bookingsLoading = true;
    });
    builder.addCase(getBookingsByProfile.fulfilled, (state, action) => {
      state.data.bookings = action.payload;
      state.bookingsLoading = false;
    });
    builder.addCase(getBookingsByProfile.rejected, (state) => {
      state.bookingsLoading = false;
    });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
