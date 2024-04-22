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
  async (profileName) => {
    const response = await fetch(`${BASE_URL}/profiles/${profileName}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    console.log("haha", data);
    console.log("haha", data.data);
    return data.data;
  }
);

// Big profile slicer

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    setProfileData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetProfileData(state) {
      return profileInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileByName.pending, (state) => {
      //
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
export default profileSlice.actions;
