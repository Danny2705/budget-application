import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    register: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
    updateProfilePicture: (state, action) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
    updateUser: (state, action) => {
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
    },
  },
});

export const { logIn, register, logout, updateProfilePicture, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
