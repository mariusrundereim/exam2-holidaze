import { createSlice } from "@reduxjs/toolkit";

const bookingInitialState = {
  //
};

export const bookingSlice = createSlice({
  name: "bookings",
  initialState: bookingInitialState,
  reducers: {
    // reducers
  },
});

export const { actions, reducer } = bookingSlice;
