import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { User, LoginData, Token, CustomError } from "../../interfaces/interfaces";

const baseURL = "http://localhost:8090";

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

export const login = createAsyncThunk(
  "auth/loginAsync",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${baseURL}/auth/login`, data)

      window.localStorage.setItem("ttp_token", response.data.token);
      const token = jwtDecode(response.data.token) as Token;

      return {
        sub: token.sub,
      };
    } catch(error) {
      const axiosError = error as AxiosError<CustomError>;
      return rejectWithValue({
        msg: axiosError.response?.data.msg,
        status: axiosError.response?.status,
      });
    }
  }
);

export const { setUser } = authSlice.actions;
export default authSlice.reducer;