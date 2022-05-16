import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlertToast, SuccessToast } from "Components";
import axios from "axios";

const initialState = {
  currentUser: {},
};

export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username: userDetails.username,
        password: userDetails.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: userDetails.name,
        username: userDetails.username,
        password: userDetails.passwordOne,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const testLogger = createAsyncThunk(
  "auth/testLogger",
  async (mockParameter, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: "TheAdmin",
        password: "Admin123",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tokenChecker = createAsyncThunk(
  "auth/tokenChecker",
  async (mockParameter, { rejectWithValue }) => {
    const encodedToken = localStorage.getItem("StormMediaToken");
    if (encodedToken) {
      try {
        const response = await axios.post("/api/auth/verify", {
          encodedToken: encodedToken,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("StormMediaToken");
      localStorage.removeItem("StormMediaUser");
      AlertToast("Logged Out");
      state.currentUser = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.foundUser.firstName
        );
        SuccessToast("Login Successful");
        state.currentUser = action.payload.foundUser;
      })
      .addCase(login.rejected, (state, action) => {
        AlertToast(`${action.payload.errors}`);
      })

      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.createdUser.firstName
        );
        SuccessToast("Signup Successful");
        state.currentUser = action.payload.createdUser;
      })
      .addCase(signup.rejected, (state, action) => {
        AlertToast(`${action.payload.errors}`);
      })

      .addCase(testLogger.fulfilled, (state, action) => {
        localStorage.setItem("StormMediaToken", action.payload.encodedToken);
        localStorage.setItem(
          "StormMediaUser",
          action.payload.foundUser.firstName
        );
        SuccessToast("Login Successful");
        state.currentUser = action.payload.foundUser;
      })
      .addCase(testLogger.rejected, (state, action) => {
        AlertToast(`${action.payload.errors}`);
      })

      .addCase(tokenChecker.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload.user;
        }
      })
      .addCase(tokenChecker.rejected, (state, action) => {
        AlertToast(`${action.payload.errors}`);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
