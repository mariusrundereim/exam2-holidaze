import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";
// import { setProfileData } from "../auth/userSlice";

const profileInitialState = {
  bookings: [],
  isLoading: false,
  bookingsLoading: false,
};

// Single profile
export const fetchProfileByName = createAsyncThunk(
  "profiles/fetchProfileByName",
  async (profileName) => {
    const response = await fetch(
      `${BASE_URL}/profiles/${profileName}?_bookings=true&_venues=true`,
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
        `${BASE_URL}/profiles/${profileName}/bookings?_bookings=true&_venue=true`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profileName, data }, { dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/profiles/${profileName}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile not updated");
      }

      const responseData = await response.json();
      // dispatch(setProfileData(responseData));
      return responseData;
    } catch (error) {
      throw new Error(error.message || "An error occurred during the update");
    }
  }
);

// Big profile slicer

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    setProfileData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetProfileState: () => profileInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileByName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfileByName.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProfileByName.fulfilled, (state, action) => {
      Object.entries(action.payload.data).forEach(([key, value]) => {
        state[key] = value;
      });
      state.isLoading = false;
    });
    builder.addCase(getBookingsByProfile.pending, (state) => {
      state.bookingsLoading = true;
    });
    builder.addCase(getBookingsByProfile.fulfilled, (state, action) => {
      state.bookings = action.payload;
      state.bookingsLoading = false;
    });
    builder.addCase(getBookingsByProfile.rejected, (state) => {
      state.bookingsLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
      state.isLoading = false;
    });
  },
});

export const { setProfileData, resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
