import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const venuesInitialState = {
  selectedVenue: null,
  allVenuesList: [],
  filteredVenues: [],
  searchVenues: [],
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
    return data;
  }
);

// Create a venue

export const createVenue = createAsyncThunk(
  "venues/createVenue",
  async (newVenue) => {
    const response = await fetch(`${BASE_URL}/venues`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newVenue),
    });
    const data = await response.json();
    return data;
  }
);

// Venues by Profile

export const getVenuesByProfile = createAsyncThunk(
  "venues/getVenuesByProfile",
  async (profileName) => {
    try {
      const response = await fetch(
        `${BASE_URL}/profiles/${profileName}/venues?_venue=true&_customer=true`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed: " + response.statusText);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw error; // Re-throw to propagate error
    }
  }
);

// Delete venue

export const deleteVenue = createAsyncThunk(
  "venues/deleteVenue",
  async ({ id }) => {
    try {
      const response = await fetch(`${BASE_URL}/venues/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Venue deletion failed");
      }

      return id;
    } catch (error) {
      console.error(error);
    }
  }
);

// Search venues

export const searchVenues = createAsyncThunk(
  "venues/searchVenues",
  async ({ query }) => {
    try {
      const response = await fetch(`${BASE_URL}/venues/search?q=${query}`);

      if (!response.ok) {
        throw new Error("Search failed");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState: venuesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("venues/filteredVenuesUpdate", (state, action) => {
        state.filteredVenues = action.payload;
      })
      .addCase(fetchVenues.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.allVenuesList = action.payload.data;
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
        state.allVenuesList.push(action.payload);
        state.loading = "idle";
      })
      .addCase(createVenue.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(getVenuesByProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVenuesByProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVenuesByProfile.fulfilled, (state, action) => {
        state.venues = action.payload;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        //fiks meg
        state.venues = state.venues.filter((id) => id !== action.payload);
      })
      .addCase(searchVenues.fulfilled, (state, action) => {
        state.searchVenues = action.payload;
      });
  },
});

// export const { venuesById } = venueSlice.actions;
export default venueSlice.reducer;
