import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlertToast, SuccessToast } from "Components";
import axios from "axios";

const initialState = {
  currentUser: {},
};

export const login = createAsyncThunk("auth/login", async (userDetails) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      username: userDetails.username,
      password: userDetails.password,
    });
    return response.data;
  } catch (error) {
    AlertToast(`${error.response.data.errors}`);
  }
});

export const signup = createAsyncThunk("auth/signup", async (userDetails) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      firstName: userDetails.name,
      username: userDetails.username,
      password: userDetails.passwordOne,
    });
    return response.data;
  } catch (error) {
    AlertToast(`${error.response.data.errors}`);
  }
});

export const testLogger = createAsyncThunk("auth/testLogger", async () => {
  try {
    const response = await axios.post("/api/auth/login", {
      username: "TheAdmin",
      password: "Admin123",
    });
    return response.data;
  } catch (error) {
    AlertToast(`${error.response.data.errors}`);
  }
});

export const tokenChecker = createAsyncThunk("auth/tokenChecker", async () => {
  const encodedToken = localStorage.getItem("StormMediaToken");
  if (encodedToken) {
    try {
      const response = await axios.post("/api/auth/verify", {
        encodedToken: encodedToken,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("StormMediaToken");
  localStorage.removeItem("StormMediaUser");
  AlertToast("Logged Out");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload.foundUser;
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.foundUser.firstName
        );
        SuccessToast("Login Successful");
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.currentUser = action.payload.createdUser;
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.createdUser.firstName
        );
        SuccessToast("Signup Successful");
      })

      .addCase(testLogger.fulfilled, (state, action) => {
        state.currentUser = action.payload.foundUser;
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.foundUser.firstName
        );
        SuccessToast("Login Successful");
      })

      .addCase(tokenChecker.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload.user;
        }
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.currentUser = {};
      });
  },
});

export default authSlice.reducer;
