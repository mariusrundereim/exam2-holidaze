import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
import { getVenuesByProfile } from "../venues/venueSlice";
import { deleteVenue } from "../venues/venueSlice";

const profileInitialState = {
  venues: [],
  venueIds: [],
  bookingsByProfile: [],
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
      console.log(error);
    }
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
    builder.addCase(getVenuesByProfile.fulfilled, (state, action) => {
      state.venueIds = action.payload;
    });
    builder.addCase(deleteVenue.fulfilled, (state, action) => {
      state.venueIds = state.venueIds.filter((id) => id !== action.payload);
    });
    builder.addCase(getBookingsByProfile.fulfilled, (state, action) => {
      state.bookingsByProfile = action.payload;
    });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
