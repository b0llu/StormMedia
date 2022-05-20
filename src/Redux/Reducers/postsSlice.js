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

export const getAllPosts = createAsyncThunk("posts/getAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createNewPost = createAsyncThunk(
  "posts/createNew",
  async (post, thunkAPI) => {
    const encodedToken = localStorage.getItem("StormMediaToken");
    try {
      const response = await axios.post(
        "/api/user/posts/",
        { content: post },
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.post(
      `/api/posts/like/${id}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const dislikePost = createAsyncThunk("posts/dislike", async (id, thunkAPI) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.post(
      `/api/posts/dislike/${id}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const postComment = createAsyncThunk(
  "posts/comment",
  async ({ id, comment }, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const bookmark = createAsyncThunk("post/bookmark", async (postId, thunkAPI) => {
  try {
    const encodedToken = localStorage.getItem("StormMediaToken");
    const response = await axios.post(
      `/api/users/bookmark/${postId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeBookmark = createAsyncThunk(
  "post/removeBookmark",
  async (postId, thunkAPI) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  "post/edit",
  async ({ id, content }, thunkAPI) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.post(
        `/api/posts/edit/${id}`,
        { postData: { content } },
        { headers: { authorization: encodedToken } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id, thunkAPI) => {
    try {
      const encodedToken = localStorage.getItem("StormMediaToken");
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: { authorization: encodedToken },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
      .addCase(getAllPosts.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        SuccessToast("Posted");
        state.posts = action.payload.posts;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
      .addCase(likePost.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(dislikePost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
      .addCase(dislikePost.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(postComment.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
      .addCase(postComment.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(bookmark.fulfilled, (state, action) => {
        SuccessToast("Added to Bookmarks");
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(bookmark.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(removeBookmark.fulfilled, (state, action) => {
        AlertToast("Removed From Bookmarks");
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(editPost.fulfilled, (state, action) => {
        SuccessToast("Post Edited");
        state.posts = action.payload.posts;
      })
      .addCase(editPost.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        AlertToast("Post Deleted");
        state.posts = action.payload.posts;
      })
      .addCase(deletePost.rejected, (state, action) => {
        AlertToast(`${action.payload.errors[0]}`);
      });
  },
});

const { actions, reducer } = postsSlice;
export const { sortByDate, sortByRecent, sortByTrending } = actions;
export { actions, reducer as default };
