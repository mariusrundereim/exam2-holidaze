import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  test: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUserState: () => userInitialState,
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
