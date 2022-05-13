import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AlertToast, SuccessToast } from "Components";

const initialState = {
  users: [],
};

export const getAllUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    AlertToast(error.response.data.message);
  }
});

export const followUser = createAsyncThunk("users/follow", async (id) => {
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
    AlertToast(error.response.data.errors[0]);
  }
});

export const unfollowUser = createAsyncThunk("users/unfollow", async (id) => {
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
    AlertToast(error.response.data.errors[0]);
  }
});

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

export const editUser = createAsyncThunk("users/edit", async (userData) => {
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
    console.log(error);
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

      .addCase(followUser.fulfilled, followUnfollowUser)
      .addCase(unfollowUser.fulfilled, followUnfollowUser)

      .addCase(editUser.fulfilled, (state, action) => {
        return {
          ...state,
          users: state.users.map((user) => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            } else {
              return user;
            }
          }),
        };
      });
  },
});

export default userSlice.reducer;
