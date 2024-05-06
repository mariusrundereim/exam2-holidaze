import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./auth/authSlice";
// import venueReducer from "./venues/venueSlice";
import venueSlice from "./venues/venueSlice";
import userSlice from "./auth/userSlice";
import profileSlice from "./profile/profileSlice";
import bookingSlice from "./bookings/bookingSlice";
import venueFilteringMiddleware from "./middleware/venueFilterMiddleware";
import profilesSlice from "./profiles/profilesSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "profile", "booking"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  venues: venueSlice,
  profile: profileSlice,
  profiles: profilesSlice,
  booking: bookingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/REGISTER",
        ],
      },
    }).concat(venueFilteringMiddleware),
});

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
