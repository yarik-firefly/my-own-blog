import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getOneComment = createAsyncThunk(
  "comment/getAllComment",
  async (id) => {
    try {
      const { data } = await axios.get(`posts/comment/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (obj, {dispatch}) => {
    const { value } = obj;
    console.log(obj);
    try {
      const { data } = await axios.post(`/posts/${obj.id}`, { value });
      dispatch(getOneComment(obj.id));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  comments: [],
  statusGet: "loading",
  statusPost: "loading",
};

const commentsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [getOneComment.pending]: (state) => {
      state.comments = [];
      state.statusGet = "loading";
    },
    [getOneComment.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.statusGet = "success";
    },
    [getOneComment.rejected]: (state) => {
      state.comments = [];
      state.statusGet = "error";
    },
    //================================================
    [addComment.pending]: (state) => {
      // state.comments = [];
      state.statusPost = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.statusPost = "success";
    },
    [addComment.rejected]: (state) => {
      // state.comments = [];
      state.statusPost = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
