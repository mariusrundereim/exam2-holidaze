import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const bookingInitialState = {
  selectedBooking: null,
  bookingList: [],
};

// All bookings
export const allBookings = createAsyncThunk(
  "bookings/allBookings",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Single booking

export const bookingById = createAsyncThunk(
  "bookings/bookingById",
  async ({ id, dateFrom, dateTo, customer, venue }) => {
    const queryParams = new URLSearchParams();
    if (customer) queryParams.append("_customer", customer);
    if (venue) queryParams.append("_venue", venue);

    const response = await fetch(`${BASE_URL}/bookings/${id}?${queryParams}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    return data;
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
      .addCase(allBookings.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(allBookings.fulfilled, (state, action) => {
        state.bookingList = action.payload.data;
      });
  },
});

export const { setBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
