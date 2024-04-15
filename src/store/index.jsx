import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
