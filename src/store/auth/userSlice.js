import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUserState: (state) => initialState,
  },
});

export const { setProfileData, resetUserState } = userSlice.actions;
export default userSlice.reducer;
