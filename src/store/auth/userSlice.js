import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venueManager: true,
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
    resetUserState: () => initialState,
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
