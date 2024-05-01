import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
import { getVenuesByProfile } from "../venues/venueSlice";
import { deleteVenue } from "../venues/venueSlice";

const profileInitialState = {
  venues: [],
  venueIds: [],
  bookings: [],
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
      console.log("Updating venueid in profileslice", action.payload);
      state.venueIds = action.payload;
    });
    builder.addCase(deleteVenue.fulfilled, (state, action) => {
      state.venueIds = state.venueIds.filter((id) => id !== action.payload);
      // This filters out the deleted venue's id from the venueIds array
    });
  },
});

export const { setProfileData, resetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
