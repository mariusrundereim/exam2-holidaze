import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./auth/authSlice";
import venueReducer from "./venues/venueSlice";
import userSlice from "./auth/userSlice";
import profileSlice from "./profiles/profileSlice";
import bookingSlice from "./bookings/bookingSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "profile", "booking"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  venues: venueReducer,
  profile: profileSlice,
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
    }),
});

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
