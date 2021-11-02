import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  username: "",
  email: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    setSignOutState: (state) => {
      state.username = null;
      state.email = null;
      state.id = null;
    },
  },
});

export const { setSignOutState, setUserDetails } = userSlice.actions;

const selectUser = (state) => state.user;

export const selectUsername = createSelector(
  [selectUser],
  (user) => user.username
);

export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user.email
);

export default userSlice.reducer;
