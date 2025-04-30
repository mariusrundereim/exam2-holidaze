import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const bookingInitialState = {
  selectedBooking: [],
  bookingList: [],
  loading: "idle",
  error: null,
};

// All bookings
export const allBookings = createAsyncThunk(
  "bookings/allBookings",
  async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings?_customer=true&_venue=true`,
        {
          headers: getAuthHeaders(),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Single booking
export const singleBooking = createAsyncThunk(
  "booking/singleBooking",
  async ({ id }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/${id}?_customer=true&_venue=true`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching booking: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Create booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (newBooking) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newBooking),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    const data = await response.json();
    return data;
  }
);

// Update booking
export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({ id, data }) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking not updated!");
      }

      const responseData = await response.json();
      return { id, updatedBooking: responseData.data };
    } catch (error) {
      console.error("Update booking error:", error);
      throw error;
    }
  }
);

// Delete booking
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async ({ id }) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Booking deletion failed");
      }
      return id;
    } catch (error) {
      console.error("Delete booking error:", error);
      throw error;
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: bookingInitialState,
  reducers: {
    setBookingData(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // All bookings
      .addCase(allBookings.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(allBookings.fulfilled, (state, action) => {
        state.bookingList = action.payload.data;
        state.loading = "idle";
      })
      .addCase(allBookings.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingList.push(action.payload.data);
        state.loading = "idle";
      })

      // Single booking
      .addCase(singleBooking.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(singleBooking.fulfilled, (state, action) => {
        state.loading = "idle";
        state.selectedBooking = action.payload;
      })
      .addCase(singleBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      // Update booking
      .addCase(updateBooking.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookingList.findIndex(
          (booking) => booking.id === action.payload.id
        );

        if (index !== -1) {
          state.bookingList[index] = {
            ...state.bookingList[index],
            ...action.payload.updatedBooking,
          };
        }

        // Also update selectedBooking if it's the same booking
        if (
          state.selectedBooking &&
          state.selectedBooking.data &&
          state.selectedBooking.data.id === action.payload.id
        ) {
          state.selectedBooking.data = {
            ...state.selectedBooking.data,
            ...action.payload.updatedBooking,
          };
        }

        state.loading = "idle";
      })

      // Delete booking
      .addCase(deleteBooking.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookingList = state.bookingList.filter(
          (booking) => booking.id !== action.payload
        );

        // Clear selectedBooking if it was deleted
        if (
          state.selectedBooking &&
          state.selectedBooking.data &&
          state.selectedBooking.data.id === action.payload
        ) {
          state.selectedBooking = null;
        }

        state.loading = "idle";
      });
  },
});

export const { setBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
