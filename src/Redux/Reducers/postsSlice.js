import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlertToast, SuccessToast } from "Components";
import axios from "axios";
import { sortDate, sortRecent, sortTrending } from "./utils";

const initialState = {
  posts: [],
  bookmarks: [],
  loading: false,
  sortBy: "Recent",
  sortOrder: null,
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
    const encodedToken = localStorage.getItem("StormMediaToken");
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
    const encodedToken = localStorage.getItem("StormMediaToken");
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
    const encodedToken = localStorage.getItem("StormMediaToken");
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
  "posts/comment",
  async ({ id, comment }) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `/api/posts/${id}/comment`,
        {
          commentData: { content: comment },
        },
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const bookmark = createAsyncThunk("post/bookmark", async (postId) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.post(
      `/api/users/bookmark/${postId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const removeBookmark = createAsyncThunk(
  "post/removeBookmark",
  async (postId) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/edit",
  async ({ id, content }) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `/api/posts/edit/${id}`,
        { postData: { content } },
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk("post/delete", async (id) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.delete(`/api/posts/${id}`, {
      headers: { authorization: encodedToken },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    sortByDate: (state, action) => {
      state.sortBy = "Date";
      state.sortOrder = action.payload;
      state.posts = state.posts.sort(sortDate(state.sortOrder));
    },
    sortByTrending: (state) => {
      state.sortBy = "Trending";
      state.posts = state.posts.sort(sortTrending);
    },
    sortByRecent: (state) => {
      state.sortBy = "Recent";
      state.posts = state.posts.sort(sortRecent);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        SuccessToast("Posted");
        state.posts = action.payload.posts;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })

      .addCase(dislikePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })

      .addCase(postComment.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })

      .addCase(bookmark.fulfilled, (state, action) => {
        SuccessToast("Added to Bookmarks");
        state.bookmarks = action.payload.bookmarks;
      })

      .addCase(removeBookmark.fulfilled, (state, action) => {
        AlertToast("Removed From Bookmarks");
        state.bookmarks = action.payload.bookmarks;
      })

      .addCase(editPost.fulfilled, (state, action) => {
        SuccessToast("Post Edited");
        state.posts = action.payload.posts;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        AlertToast("Post Deleted");
        state.posts = action.payload.posts;
      });
  },
});

const { actions, reducer } = postsSlice;
export const { sortByDate, sortByRecent, sortByTrending } = actions;
export { actions, reducer as default };
