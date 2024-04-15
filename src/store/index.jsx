import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
