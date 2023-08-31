import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const getTags = createAsyncThunk("posts/getTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const removePost = createAsyncThunk("posts/removePost", async (id) => {
  const { data } = axios.delete(`/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "success";
    },
    [getPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //============================================
    [getTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "success";
    },
    [getTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // =============================================
    [removePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
      // state.posts.status = "loading";
    },
  },
});

export const postReducer = postsSlice.reducer;
