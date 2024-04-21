import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { apiSlice } from "./api/apiSlice";
// import { venueSlice } from "./venues/venueSlice";
import venueReducer from "./venues/venueSlice";
// import { bookingSlice } from "./bookings/bookingSlice";
// import { profileSlice } from "./profiles/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // bookings: bookingSlice.reducer,
    venues: venueReducer,
    // profiles: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
