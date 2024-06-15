import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/interfaces";

axios.interceptors.request.use((config) => {
  return config;
});

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;