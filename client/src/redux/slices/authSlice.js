import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Default value for the user
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store the user data
    },
    clearUser: (state) => {
      state.user = null; // Clear the user data
    },
    login: (state, action) => {
      state.user = action.payload; // Handle login and set the user
    },
  },
});

export const { setUser, clearUser, login } = authSlice.actions;
export default authSlice.reducer;
