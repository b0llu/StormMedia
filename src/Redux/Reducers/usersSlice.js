import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AlertToast, SuccessToast } from "Components";

const initialState = {
  users: [],
};

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/follow",
  async (id, thunkAPI) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      SuccessToast("Followed");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollow",
  async (id, thunkAPI) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `/api/users/unfollow/${id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      AlertToast("Unfollowed");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const followUnfollowUser = (state, action) => {
  if (action.payload !== undefined) {
    state.users = state.users.map((user) => {
      if (user._id === action.payload.followUser._id) {
        return action.payload.followUser;
      } else if (user._id === action.payload.user._id) {
        return action.payload.user;
      } else return user;
    });
  }
};

export const editUser = createAsyncThunk("users/edit", async (userData, thunkAPI) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.post(
      "/api/users/edit",
      { userData },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(followUser.fulfilled, followUnfollowUser)
      .addCase(followUser.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })
      .addCase(unfollowUser.fulfilled, followUnfollowUser)
      .addCase(unfollowUser.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(editUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          if (user._id === action.payload.user._id) {
            return action.payload.user;
          } else {
            return user;
          }
        });
      })
      .addCase(editUser.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      });
  },
});

export default userSlice.reducer;
