import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUserState: () => initialState,
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
