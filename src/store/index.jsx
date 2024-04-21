import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authSlice from "./auth/authSlice";
import venueReducer from "./venues/venueSlice";
// import { bookingSlice } from "./bookings/bookingSlice";
// import { profileSlice } from "./profiles/profileSlice";
import userSlice from "./auth/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,

    // bookings: bookingSlice.reducer,
    venues: venueReducer,
    // profiles: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
