import { createSlice } from "@reduxjs/toolkit";

const venuesInitialState = {
  selectedVenue: null,
  venueList: [],
};

export const venueSlice = createSlice({
  name: "venues",
  initialState: venuesInitialState,
  reducers: {
    // your reducers for venues
  },
});

export const { actions, reducer } = venueSlice;
