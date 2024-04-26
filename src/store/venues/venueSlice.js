import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const venuesInitialState = {
  selectedVenue: null,
  venueList: [],
  filteredVenues: [],
  loading: "idle",
  error: null,
};

// Fetch all venues

export const fetchVenues = createAsyncThunk(
  "venues/fetchVenues",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/venues?page=${page}&sort=created&sortOrder=desc`,
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Single Venue

export const fetchVenueById = createAsyncThunk(
  "venues/fetchVenueById",
  async ({ id }) => {
    const response = await fetch(
      `${BASE_URL}/venues/${id}?_owner=true&_bookings=true`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await response.json();
    console.log("venue by id", data);
    return data;
  }
);

// Async thunk to create a venue

export const createVenue = createAsyncThunk(
  "venues/createVenue",
  async (newVenue) => {
    const response = await fetch(`${BASE_URL}/venues`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newVenue),
    });
    const data = await response.json();
    console.log("data::", data);
    return data;
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState: venuesInitialState,
  reducers: {
    // Synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase("venues/filteredVenuesUpdate", (state, action) => {
        state.filteredVenues = action.payload;
      })
      .addCase(fetchVenues.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.venueList = action.payload.data;
        state.loading = "idle";
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || "Failed to fetch venues";
      })
      .addCase(fetchVenueById.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.selectedVenue = action.payload.data;
        state.loading = "idle";
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(createVenue.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.venueList.push(action.payload);
        state.loading = "idle";
      })
      .addCase(createVenue.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});
export default venueSlice.reducer;
