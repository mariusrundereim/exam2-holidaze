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
      const response = await fetch(
        `${BASE_URL}/bookings?_customer=true&_venue=true`,
        {
          headers: getAuthHeaders(),
        }
      );
      const data = await response.json();
      console.log("all bookings", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Single booking

export const singleBooking = createAsyncThunk(
  "booking/singleBooking",
  async ({ id }) => {
    const response = await fetch(
      `${BASE_URL}/bookings${id}?_customer=true&_venue=true`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await response.json();
    console.log("bookingIds", data);
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
