import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./api/apiSlice";
import { bookingSlice } from "./bookings/bookingSlice";
import { venueSlice } from "./venues/venueSlice";
import { profileSlice } from "./profiles/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    bookings: bookingSlice,
    venues: venueSlice,
    profiles: profileSlice,
    // api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
