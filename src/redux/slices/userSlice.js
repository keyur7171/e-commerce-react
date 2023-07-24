import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: ''
  },
  reducers: {
    loginUser: (state, action) => {
        state.email = action.payload
    },
    logoutUser: (state) => {
        state.email = '';
        localStorage.removeItem("isLogin")
    },
  },
});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;