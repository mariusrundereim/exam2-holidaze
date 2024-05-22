import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const venuesInitialState = {
  myCreatedVenues: [],
  selectedVenue: null,
  allVenuesList: [],
  filteredVenues: [],
  searchVenues: [],
  searchFilterResults: [],
  loading: "idle",
  error: null,
};

// Fetch all venues

export const fetchVenues = createAsyncThunk(
  "venues/fetchVenues",
  async (page = 1) => {
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
      console.log(error);
    }
  }
);

// Single Venue

export const fetchVenueById = createAsyncThunk(
  "venues/fetchVenueById",
  async ({ id }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/venues/${id}?_owner=true&_bookings=true`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch venue");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
        `${BASE_URL}/profiles/${profileName}/venues?_owner=true&_bookings=true`,
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
      throw error;
    }
  }
);

// Update venue

export const updateVenue = createAsyncThunk(
  "venue/updateVenue",
  async ({ id, data }) => {
    try {
      const response = await fetch(`${BASE_URL}/venues/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Venue not updated");
      }

      return { id, data };
    } catch (error) {
      console.log(error);
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
    const response = await fetch(`${BASE_URL}/venues/search?q=${query}`);
    if (!response.ok) {
      throw new Error("Search failed");
    }
    const data = await response.json();
    return data;
    // return { data, meta };
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState: venuesInitialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchVenues = [];
    },
    filteredVenuesUpdated: (state, action) => {
      state.filteredVenues = action.payload;
    },
    updateSearchFilterResults: (state, action) => {
      state.searchFilterResults = action.payload;
    },
    clearSelectedVenue(state) {
      state.selectedVenue = null;
    },
    appendVenues(state, action) {
      state.allVenuesList = [...state.allVenuesList, ...action.payload.data];
    },
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
        state.myCreatedVenues = action.payload;
      })
      .addCase(updateVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVenue.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        const index = state.allVenuesList.findIndex(
          (venue) => venue.id === action.payload.id
        );

        if (index !== -1) {
          state.allVenuesList[index] = {
            ...state.allVenuesList[index],
            ...action.payload.data,
          };
        }
        state.loading = false;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.myCreatedVenues = state.myCreatedVenues.filter(
          (venue) => venue.id !== action.payload
        );
      })
      .addCase(searchVenues.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(searchVenues.fulfilled, (state, action) => {
        state.loading = "idle";
        state.searchVenues = action.payload;
        // state.searchVenues = action.payload.data;
        // state.meta = action.payload.meta;
      })
      .addCase(searchVenues.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export const {
  appendVenues,
  clearSelectedVenue,
  clearSearchResults,
  filteredVenuesUpdated,
  updateSearchFilterResults,
} = venueSlice.actions;
export default venueSlice.reducer;
