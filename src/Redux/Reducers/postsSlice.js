import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlertToast, SuccessToast } from "Components";
import axios from "axios";

const encodedToken = localStorage.getItem("StormMediaToken");
const initialState = {
  posts: [],
  singlePost: [],
  comments: [],
  loading: false,
};

export const getAllPosts = createAsyncThunk("posts/getAll", async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    AlertToast(error.response.data.errors[0]);
  }
});

export const createNewPost = createAsyncThunk(
  "posts/createNew",
  async (post) => {
    try {
      const response = await axios.post(
        "/api/user/posts/",
        { content: post },
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      AlertToast(error.response.data.errors[0]);
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id) => {
  try {
    const response = await axios.post(
      `/api/posts/like/${id}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const dislikePost = createAsyncThunk("posts/dislike", async (id) => {
  try {
    const response = await axios.post(
      `/api/posts/dislike/${id}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postComment = createAsyncThunk(
  "posts/postComment",
  async (comment) => {
    SuccessToast("Commented");
    return comment;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers(builder) {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.loading = false;
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        SuccessToast("Posted");
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })

      .addCase(dislikePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })

      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      });
  },
});

export default postsSlice.reducer;
