import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const getMeData = createAsyncThunk("auth/getMeData", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
  statusGetMe: "loading",
};

const authLoginSlice = createSlice({
  name: "authLogin",
  initialState,
  reducer: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getUserData.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    //==================================================
    [getMeData.pending]: (state) => {
      state.data = null;
      state.statusGetMe = "loading";
    },
    [getMeData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.statusGetMe = "success";
    },
    [getMeData.rejected]: (state) => {
      state.data = null;
      state.statusGetMe = "error";
    },
    //======================================================
    [authRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [authRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [authRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.authLogin.data);

export const { logout } = authLoginSlice.actions;
export const authReducer = authLoginSlice.reducer;
