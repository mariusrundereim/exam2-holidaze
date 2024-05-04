import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/env";
import { getAuthHeaders } from "../helper";

const profilesInitialState = {
  profilesData: [],
  isLoading: false,
};
