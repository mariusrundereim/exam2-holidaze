import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venueManager: false,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
